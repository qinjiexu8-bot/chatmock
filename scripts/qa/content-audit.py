#!/usr/bin/env python3
"""
ChatMock 内容体检 —— 为 AdSense "Low value content" 拒信提供实测依据。

度量：
  1. 每页正文词数（剥离 script/style/nav/header/footer 后的可见文本）
  2. 结构密度：h1 / h2 / h3 / p 计数、FAQ 条目数（从 JSON-LD FAQPage 取）
  3. 模板化程度：**跨页重复句子**（在 >=2 个页面出现的 40+ 字符句子，Top N）
  4. 类内相似度：同类型页面两两 Jaccard（正文词集合），给出均值与最高对

判据（沿用《关键词策略与AdSense执行手册》§4.4）：
  - 生成器页正文应 800-1500 词；< 500 词视为薄页
  - 生成器页之间不得有整段复用

用法：
  python3 scripts/qa/content-audit.py                          # 打线上
  python3 scripts/qa/content-audit.py http://localhost:3000    # 打本地
"""
import re
import sys
import html as htmlmod
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from collections import Counter, defaultdict

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://chatmock.net").rstrip("/")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ChatMockAudit/1.0"


def fetch(url, tries=4):
    last = ""
    for _ in range(tries):
        try:
            req = urllib.request.Request(
                url, headers={"User-Agent": UA, "Cache-Control": "no-cache"}
            )
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8", "ignore")
        except Exception as e:  # noqa: BLE001
            last = str(e)
    print(f"  !! 抓取失败 {url} — {last}", file=sys.stderr)
    return ""


def strip_boilerplate(h):
    for tag in ("script", "style", "nav", "header", "footer"):
        h = re.sub(rf"<{tag}\b.*?</{tag}>", " ", h, flags=re.S | re.I)
    return h


def visible_text(h):
    h = strip_boilerplate(h)
    h = re.sub(r"<[^>]+>", " ", h)
    return re.sub(r"\s+", " ", htmlmod.unescape(h)).strip()


def words(t):
    return re.findall(r"[A-Za-z][A-Za-z'\-]*", t)


def sentences(t):
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", t) if len(s.strip()) >= 40]


def norm_sent(s):
    return re.sub(r"[^a-z0-9 ]+", " ", s.lower()).strip()


def classify(path):
    p = path.rstrip("/") or "/"
    if p == "/":
        return "home"
    if p == "/examples":
        return "examples-index"
    if p.startswith("/examples/"):
        return "examples-detail"
    if p == "/blog":
        return "blog-index"
    if p.startswith("/blog/"):
        return "blog-detail"
    if p.endswith("-generator"):
        return "generator"
    return "static"


def jaccard(a, b):
    A, B = set(a), set(b)
    return len(A & B) / len(A | B) if (A | B) else 0.0


def main():
    print(f"# ChatMock 内容体检 — {BASE}\n")
    sm = fetch(f"{BASE}/sitemap.xml")
    paths = [u.replace(BASE, "").replace("https://chatmock.net", "") or "/"
             for u in re.findall(r"<loc>(.*?)</loc>", sm)]
    print(f"sitemap 共 {len(paths)} 条 URL\n")

    with ThreadPoolExecutor(max_workers=6) as ex:
        raws = list(ex.map(lambda p: (p, fetch(BASE + p)), paths))

    rows = []
    sent_pages = defaultdict(set)
    for path, h in raws:
        if not h:
            continue
        title = (re.search(r"<title>(.*?)</title>", h, re.S) or [None, ""])[1]
        text = visible_text(h)
        w = words(text)
        h2 = len(re.findall(r"<h2\b", h, re.I))
        h3 = len(re.findall(r"<h3\b", h, re.I))
        ps = len(re.findall(r"<p\b", h, re.I))
        faq = 0
        for block in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', h, re.S):
            faq += len(re.findall(r'"@type"\s*:\s*"Question"', block))
        rows.append(dict(path=path, kind=classify(path), title=title, words=len(w),
                         uniq=len(set(x.lower() for x in w)), h2=h2, h3=h3, p=ps,
                         faq=faq, wset=set(x.lower() for x in w)))
        for s in {norm_sent(s) for s in sentences(text)}:
            sent_pages[s].add(path)

    print("## 一、逐页内容概览\n")
    print("| 页面 | 类型 | 正文词数 | 不重复词 | h2 | h3 | p | FAQ |")
    print("|---|---|---:|---:|---:|---:|---:|---:|")
    for r in sorted(rows, key=lambda x: (x["kind"], x["words"])):
        print(f"| `{r['path']}` | {r['kind']} | {r['words']} | {r['uniq']} "
              f"| {r['h2']} | {r['h3']} | {r['p']} | {r['faq']} |")

    print("\n## 二、分类统计\n")
    by = defaultdict(list)
    for r in rows:
        by[r["kind"]].append(r["words"])
    print("| 类型 | 页数 | 词数中位 | 最少 | 最多 |")
    print("|---|---:|---:|---:|---:|")
    for k in sorted(by):
        v = sorted(by[k])
        print(f"| {k} | {len(v)} | {v[len(v)//2]} | {v[0]} | {v[-1]} |")

    print("\n## 三、类内相似度（正文词集合 Jaccard）\n")
    print("> 越高越像「换平台名填空」。0.5+ 基本可判定为同模板。\n")
    print("| 类型 | 页数 | 平均相似度 | 最高一对 |")
    print("|---|---:|---:|---|")
    for k in sorted(by):
        group = [r for r in rows if r["kind"] == k]
        if len(group) < 2:
            continue
        vals, top = [], (0.0, "", "")
        for i in range(len(group)):
            for j in range(i + 1, len(group)):
                s = jaccard(group[i]["wset"], group[j]["wset"])
                vals.append(s)
                if s > top[0]:
                    top = (s, group[i]["path"], group[j]["path"])
        print(f"| {k} | {len(group)} | {sum(vals)/len(vals):.2f} | {top[0]:.2f} "
              f"`{top[1]}` ↔ `{top[2]}` |")

    dupes = sorted(((len(p), s, p) for s, p in sent_pages.items() if len(p) >= 2),
                   reverse=True)
    print(f"\n## 四、跨页重复句子（>=2 页出现，共 {len(dupes)} 条）\n")
    if not dupes:
        print("无。\n")
    else:
        print("| 出现页数 | 类型分布 | 句子 |")
        print("|---:|---|---|")
        for n, s, ps_ in dupes[:30]:
            kinds = Counter(classify(x) for x in ps_)
            kd = " ".join(f"{k}×{v}" for k, v in kinds.most_common())
            short = s if len(s) <= 100 else s[:97] + "..."
            print(f"| {n} | {kd} | {short} |")
    print()


if __name__ == "__main__":
    main()
