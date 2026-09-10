#!/usr/bin/env python3
"""
关键词分析器：把 Autocomplete 原始词表转成可决策的洞察

核心指标：
  count    —— 该词在多少个不同 seed 的下拉里复现（热度代理，越高越热）
  best_rank—— 出现过的最好下拉位次（0=第一，越靠前越热）

用法: python3 analyze_keywords.py
"""

import csv
import re
from collections import defaultdict

CSV = "/Users/xuqinjie/wwwroot/fake_chat/scripts/output/keywords_report.csv"

PLATFORMS = {
    "whatsapp": ["whatsapp", "whats app", "wasap", "wapp"],
    "imessage": ["imessage", "i message", "imsg"],
    "instagram": ["instagram", "insta", "ig dm", "ig chat"],
    "snapchat": ["snapchat", "snap chat"],
    "telegram": ["telegram"],
    "discord": ["discord"],
    "messenger": ["messenger", "facebook messenger"],
    "signal": ["signal app", "signal chat", "signal message"],
    "tiktok": ["tiktok", "tik tok"],
    "android": ["android", "samsung", "galaxy"],
    "iphone/ios": ["iphone", "ios", "apple message", "apple text"],
    "sms/text": ["text message", "sms", "text conversation", "texting"],
    "x/twitter": ["twitter", " x dm", "x post", "tweet"],
    "wechat": ["wechat", "we chat"],
    "facebook": ["facebook"],
}

INTENTS = {
    "generator": ["generator", "gerador", "generador"],
    "maker": ["maker", "make"],
    "creator": ["creator", "criador", "creador"],
    "screenshot": ["screenshot", "captura", "print", "captura de tela"],
    "prank": ["prank", "broma", "pegadinha", "troll"],
    "call": ["call", "llamada", "chamada", "video call", "llamada falsa"],
    "status": ["status", "estado", "last seen"],
    "group": ["group", "grupo"],
    "voice/audio": ["voice", "audio", "voz", "voice message", "nota de voz"],
    "video": ["video"],
    "online/free": ["online", "free", "gratis", "gratuito", "gratuita"],
    "app": ["app", "aplicativo", "aplicacion"],
    "template": ["template", "plantilla", "modelo"],
    "editor": ["editor", "edit"],
    "download": ["download", "descargar", "baixar"],
}


def load():
    rows = []
    with open(CSV, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            r["count"] = int(r["count"])
            r["best_rank"] = int(r["best_rank"])
            rows.append(r)
    return rows


def main():
    rows = load()
    en = [r for r in rows if "en" in r["markets"].split(",")]
    es = [r for r in rows if any(m in r["markets"].split(",") for m in ("es", "mx"))]
    br = [r for r in rows if "br" in r["markets"].split(",")]

    print("=" * 68)
    print("一、数据概览")
    print("=" * 68)
    print(f"去重词总数        {len(rows)}")
    print(f"  英文(us)        {len(en)}")
    print(f"  西语(es+mx)     {len(es)}")
    print(f"  葡语(br)        {len(br)}")

    print()
    print("=" * 68)
    print("二、平台热度（英文市场）")
    print("=" * 68)
    print(f"{'平台':<14}{'词数':>6}{'总热度':>9}{'最高单条热度':>13}   代表词")
    print("-" * 68)
    plat = []
    for name, pats in PLATFORMS.items():
        hit = [r for r in en if any(p in r["keyword"] for p in pats)]
        if not hit:
            continue
        total = sum(r["count"] for r in hit)
        top = max(hit, key=lambda r: (r["count"], -r["best_rank"]))
        plat.append((name, len(hit), total, top["keyword"], top["count"]))
    plat.sort(key=lambda x: -x[2])
    for name, n, total, topkw, topc in plat:
        print(f"{name:<14}{n:>6}{total:>9}{topc:>13}   {topkw[:34]}")

    print()
    print("=" * 68)
    print("三、需求意图热度（英文市场）—— 用户到底想要什么功能")
    print("=" * 68)
    print(f"{'意图':<14}{'词数':>6}{'总热度':>9}   代表词")
    print("-" * 68)
    intent = []
    for name, pats in INTENTS.items():
        hit = [r for r in en if any(p in r["keyword"] for p in pats)]
        if not hit:
            continue
        total = sum(r["count"] for r in hit)
        top = max(hit, key=lambda r: (r["count"], -r["best_rank"]))
        intent.append((name, len(hit), total, top["keyword"]))
    intent.sort(key=lambda x: -x[2])
    for name, n, total, topkw in intent:
        print(f"{name:<14}{n:>6}{total:>9}   {topkw[:36]}")

    print()
    print("=" * 68)
    print("四、英文 Top 40 热词")
    print("=" * 68)
    en.sort(key=lambda r: (-r["count"], r["best_rank"]))
    for i, r in enumerate(en[:40], 1):
        flag = "★" if r["best_rank"] == 0 else " "
        print(f"{i:>3}. [{r['count']:>2}]{flag} {r['keyword']}")

    for label, data in (("西语 es+mx", es), ("葡语 br", br)):
        if not data:
            continue
        print()
        print("=" * 68)
        print(f"五、{label} Top 25")
        print("=" * 68)
        data.sort(key=lambda r: (-r["count"], r["best_rank"]))
        for i, r in enumerate(data[:25], 1):
            print(f"{i:>3}. [{r['count']:>2}] {r['keyword']}")

    # 未被任何平台词覆盖但热度高的词 = 潜在遗漏需求
    print()
    print("=" * 68)
    print("六、高热度但未归属任何平台（潜在遗漏需求）")
    print("=" * 68)
    all_pats = [p for ps in PLATFORMS.values() for p in ps]
    orphan = [r for r in en if not any(p in r["keyword"] for p in all_pats)]
    orphan.sort(key=lambda r: (-r["count"], r["best_rank"]))
    for r in orphan[:20]:
        print(f"    [{r['count']:>2}] {r['keyword']}")


if __name__ == "__main__":
    main()
