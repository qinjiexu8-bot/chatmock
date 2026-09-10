#!/usr/bin/env python3
"""
ChatMock 关键词采集器
数据源：Google Autocomplete (suggestqueries.google.com)

原理：Autocomplete 返回的是真实用户高频搜索的查询词，且按流行度排序。
它不给绝对搜索量，但给三样更实用的东西：
  1. 这个词是否真实存在搜索需求（有 = 有量）
  2. 相对热度（结果内排序 + 跨 seed 复现次数）
  3. 真实的需求结构（用户到底在搜什么功能/场景）

支持 gl/hl 参数做地区化采集，用于验证西语/葡语市场。

用法:
  python3 keyword_research.py
输出:
  scripts/output/keywords_raw.json    全量原始结果
  scripts/output/keywords_report.csv  去重统计后的词表
"""

import json
import time
import urllib.parse
import urllib.request
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
ENDPOINT = "https://suggestqueries.google.com/complete/search"


def fetch(seed, hl="en", gl="us", retries=2):
    """抓单个 seed 的 autocomplete 建议"""
    params = urllib.parse.urlencode({"client": "firefox", "q": seed, "hl": hl, "gl": gl})
    url = f"{ENDPOINT}?{params}"
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=12) as r:
                data = json.loads(r.read().decode("utf-8", "ignore"))
            if isinstance(data, list) and len(data) > 1 and isinstance(data[1], list):
                return data[1]
            return []
        except Exception:
            if attempt < retries:
                time.sleep(0.8 * (attempt + 1))
    return []


# ---------------------------------------------------------------- 采集配置

# 核心种子词：做完整 a-z + 修饰词扩展（需求结构最丰富）
CORE_EN = [
    "fake whatsapp",
    "fake chat",
    "fake text message",
    "whatsapp chat generator",
]

# 常规种子词：基础查询 + 修饰词
NORMAL_EN = [
    "fake imessage", "fake instagram dm", "fake snapchat", "fake telegram",
    "fake discord", "fake messenger", "fake signal", "fake tiktok dm",
    "fake android sms", "fake iphone text", "fake iphone message",
    "fake conversation", "chat screenshot generator", "chat mockup",
    "fake whatsapp call", "fake whatsapp status", "fake group chat",
]

MODIFIERS = [
    "generator", "maker", "creator", "screenshot", "conversation",
    "chat", "online", "free", "app", "editor", "video",
]

ALPHABET = [chr(c) for c in range(ord("a"), ord("z") + 1)]

# 地区化采集：验证西语 / 葡语市场
REGIONS = {
    "es": {  # 西班牙西语
        "hl": "es", "gl": "es",
        "seeds": [
            "whatsapp falso", "chat falso", "conversacion falsa",
            "mensaje falso", "generador conversacion whatsapp",
            "fake whatsapp",
        ],
        "mods": ["generador", "creador", "gratis", "online", "captura", "chat"],
    },
    "mx": {  # 墨西哥西语（WhatsApp 核心市场）
        "hl": "es", "gl": "mx",
        "seeds": [
            "whatsapp falso", "chat falso", "conversacion falsa",
            "generador chat whatsapp",
        ],
        "mods": ["generador", "creador", "gratis", "online"],
    },
    "br": {  # 巴西葡语（WhatsApp 最大市场）
        "hl": "pt", "gl": "br",
        "seeds": [
            "whatsapp falso", "conversa falsa", "chat falso",
            "mensagem falsa", "gerador conversa whatsapp", "gerador chat whatsapp",
        ],
        "mods": ["gerador", "criador", "gratis", "online", "print"],
    },
}


def build_tasks():
    """构建 (seed, hl, gl, market, category) 任务列表"""
    tasks = []
    for s in CORE_EN:
        tasks.append((s, "en", "us", "en", "core"))
        for a in ALPHABET:
            tasks.append((f"{s} {a}", "en", "us", "en", "core_az"))
        for m in MODIFIERS:
            tasks.append((f"{s} {m}", "en", "us", "en", "core_mod"))
    for s in NORMAL_EN:
        tasks.append((s, "en", "us", "en", "normal"))
        for m in MODIFIERS[:8]:
            tasks.append((f"{s} {m}", "en", "us", "en", "normal_mod"))
    for market, cfg in REGIONS.items():
        for s in cfg["seeds"]:
            tasks.append((s, cfg["hl"], cfg["gl"], market, "region_core"))
            for m in cfg["mods"]:
                tasks.append((f"{s} {m}", cfg["hl"], cfg["gl"], market, "region_mod"))
    # 去重保序
    seen, out = set(), []
    for t in tasks:
        k = (t[0], t[1], t[2])
        if k not in seen:
            seen.add(k)
            out.append(t)
    return out


def main():
    tasks = build_tasks()
    print(f"[i] 任务数: {len(tasks)}")

    results = []
    done = 0
    with ThreadPoolExecutor(max_workers=8) as ex:
        future_map = {
            ex.submit(fetch, t[0], t[1], t[2]): t for t in tasks
        }
        for fut in as_completed(future_map):
            seed, hl, gl, market, cat = future_map[fut]
            sugg = fut.result()
            done += 1
            if done % 50 == 0:
                print(f"    {done}/{len(tasks)}")
            for rank, sug in enumerate(sugg):
                results.append({
                    "seed": seed, "market": market, "category": cat,
                    "suggestion": sug, "rank": rank,
                })

    # ---- 统计
    # count = 该词在多少个不同 seed 下出现（复现广度，热度代理）
    # best_rank = 出现过的最好排名（越靠前越热）
    stat = defaultdict(lambda: {"markets": set(), "count": 0,
                                "best_rank": 99, "seeds": set()})
    for r in results:
        k = r["suggestion"].lower().strip()
        s = stat[k]
        s["count"] += 1
        s["markets"].add(r["market"])
        s["seeds"].add(r["seed"])
        if r["rank"] < s["best_rank"]:
            s["best_rank"] = r["rank"]

    rows = []
    for kw, s in stat.items():
        rows.append({
            "keyword": kw,
            "count": s["count"],
            "best_rank": s["best_rank"],
            "markets": ",".join(sorted(s["markets"])),
            "n_markets": len(s["markets"]),
            "words": len(kw.split()),
        })
    rows.sort(key=lambda x: (-x["count"], x["best_rank"], x["keyword"]))

    outdir = "/Users/xuqinjie/wwwroot/fake_chat/scripts/output"
    with open(f"{outdir}/keywords_raw.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=1)
    with open(f"{outdir}/keywords_report.csv", "w", encoding="utf-8") as f:
        f.write("keyword,count,best_rank,markets,n_markets,words\n")
        for r in rows:
            f.write(f'"{r["keyword"]}",{r["count"]},{r["best_rank"]},'
                    f'{r["markets"]},{r["n_markets"]},{r["words"]}\n')

    print(f"[✓] 原始记录 {len(results)} 条 -> 去重词 {len(rows)} 个")
    print(f"[✓] {outdir}/keywords_raw.json")
    print(f"[✓] {outdir}/keywords_report.csv")

    # -market 分布概览
    dist = defaultdict(int)
    for r in rows:
        for m in r["markets"].split(","):
            dist[m] += 1
    print("[i] 各市场词数: " + ", ".join(f"{k}={v}" for k, v in sorted(dist.items())))


if __name__ == "__main__":
    main()
