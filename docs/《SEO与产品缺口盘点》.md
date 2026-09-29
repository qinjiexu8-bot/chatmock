# ChatMock — SEO / 产品功能 / 用户体验 三点缺口盘点

> 盘点日期：2026-09-29
> 数据来源：`scripts/output/keywords_report.csv`（1615 个去重词，源自 2260 条 Google Autocomplete 采样）、
> 线上 34 条路由实测、仓库全量代码走查

## 0. 口径（先读，否则下面的数字会被误读）

| 字段 | 真实含义 |
|---|---|
| `count` | 该词在采样里被命中的次数 → 反映**需求广度**（有多少种问法指向它） |
| `best_rank` | 它在 Google 下拉建议里出现过的**最好位次**，**0 = 第一位 = 最热**（脚本默认 99 = 从未进过下拉） |

**这两个都不是搜索量。** 本报告不含 SERP 数据，因此**无法判断竞争强度** ——
"某词在下拉首位"说明需求真实，不代表好排。

> 上一版口头结论里我把 `best_rank: 0` 读成了"未进前 100、竞争弱"，**那是反的**。
> 依据在 `scripts/keyword_research.py:159` 的注释。已更正。

---

## 1. SEO 缺口

### 1.1 平台覆盖缺口（加一页即可接住）

| 平台 | 词数 | 需求热度 | 代表词（命中次数, 下拉位次） | 现状 |
|---|---|---|---|---|
| **Signal** | 24 | 37 | `fake signal generator` (4, **rank 0**)<br>`fake signal chat maker` (4, **rank 0**)<br>`fake signal chat creator` (3, rank 1) | **站上无此平台** |
| **TikTok DM** | 13 | 16 | `fake chat dm tiktok` (2, **rank 0**)<br>`fake tiktok dm maker` (2, **rank 0**)<br>`fake tiktok dm generator` (1, rank 0) | 仅 blog 顺带提及，无专页 |

**已排除的假信号**：`Line`。粗筛时"line"命中 91 词，精确匹配 `fake line` 后为 **0** —— 全部是 "on**line**" 的误命中。不做。

### 1.2 功能面缺口（不是新平台，是新工具）

| 功能面 | 词数 | 需求热度 | 代表词 | 现状 |
|---|---|---|---|---|
| **WhatsApp Status**（状态更新 + 浏览量） | 37 | 67 | `fake whatsapp status maker` (4, **rank 0**)<br>`fake whatsapp status maker free` (4, **rank 0**)<br>`fake whatsapp status screenshot generator` (3, rank 1)<br>`fake whatsapp status view maker` (3, rank 1)<br>`fake whatsapp status views 300` (2, rank 2) | **完全没做** |

值得单独拎出来：这不是"聊天"，是**另一条产品线**（状态更新 + 浏览量数字）。
需求分两类意图：状态截图本身、以及"浏览量数字伪造"（`views 300`）。
正因不是聊天，现有 10 个生成器页一条都接不住。

### 1.3 全表最高频词没有承接

| 词 | 命中 | 位次 | 覆盖 |
|---|---|---|---|
| `fake whatsapp contact` | **9**（全表第一） | rank 1 | **0 处** |
| `can you make fake text messages` | 9 | rank 2 | 疑问句式，宜 FAQ/blog 承接 |
| `can you fake text messages` | 7 | rank 1 | 同上 |

前两个是"能不能做"的**疑问式搜索**，属于内容题不是工具题 —— 现有 blog 没覆盖这两个问法。

### 1.4 无下载截流（app / apk 意图）

| 词群 | 词数 | 需求热度 | 说明 |
|---|---|---|---|
| 含 `app` | **586** | 835 | 用户描述需求时**大量**带 "app" |
| 含 `apk` | 38 | 47 | `fake chat conversation mod apk` (4, rank 2)、`fake chat no ads apk` (1, rank 2) |

**这是本站的结构性错配，也是最大的机会**：用户的默认心智是"下载一个 app"，
而我们是**零下载、零安装、纯浏览器、不上传**。

- 站上 `apk` 出现 **0 处**、`without watermark` 出现 **0 处**（只写了 "no watermark"）
- 没有任何页面正面回答"我不想装 app 怎么办"

一个 `/no-download` 或"web tool vs apk"对比页可以同时接住两类词，且**天然原创**（我们有真实的技术差异可讲）。

### 1.5 语言缺口

| 语言 | 词数 | 需求热度 | 代表词 |
|---|---|---|---|
| 西语 | 79 | 150 | `chat falso online` (6, **rank 0**)、`whatsapp falso online` (6, **rank 0**)、`chat falso messenger online` (5, rank 1)、`whatsapp falso para bromas online` (5, rank 2) |
| 葡语 | 1 | 2 | 采样覆盖不足，样本太小不能下结论 |

手册 §3 已识别过机会（`chatfalso.com` 只做 WhatsApp，其余平台是空位），
且这些词的意图里普遍带 `online` —— **正好是纯网页工具的优势位**。

但站上**没有任何 i18n 架构**（无 `hreflang`、无 locale 路由、无语言切换），是中等工程量。

### 1.6 内容资产厚度

| 资产 | 现状 | 缺口 |
|---|---|---|
| 示例库 | **每平台仅 2 条**（共 20 条 + 5 组预设） | 太薄。既是长尾 SEO 资产，也是"照着改"的转化入口 |
| blog | 8 篇，覆盖 Discord / iMessage-Android / WhatsApp / Instagram / Telegram | **缺 Messenger、Group Chat、Snapchat、WhatsApp Call、Android SMS 的专属指南**（手册 §5 要求每平台一篇） |
| FAQ schema | 11 页已带 `FAQPage` ✅ | 覆盖良好 |

### 1.7 已修的缺陷

`android-sms-generator` 与 `whatsapp-call-generator` 的 `<title>` 渲染成
`... | ChatMock | ChatMock`（页面 metadata 自己写了后缀，layout 的
`template: "%s | ChatMock"` 又加一次）。已修，10 个生成器页复核通过。

---

## 2. 产品功能缺口（真机保真度）

渲染器**当前支持**：文本、图片消息、通话记录（含 video 标记）、已读回执、
每条时间戳、头像、日期分隔、群聊彩色发送者名。

真机截图里常见但**我们没有**的（按对"无限接近真机"的破坏程度排序）：

| 缺失形态 | 真机里长什么样 | 优先级 | 备注 |
|---|---|---|---|
| **端到端加密提示** | WhatsApp 每次新会话顶部那条黄底系统提示 | **高** | 真机几乎必现，我们一条没有 → 直接违反"无限接近真机"的口径 |
| **回复引用** | 气泡内嵌被引用消息的小方块 | 高 | 做假对话的高频真实需求 |
| **表情回应** | 气泡右下角挂的小 emoji | 中 | |
| **语音消息** | 波形 + 时长 + 播放按钮 | 中 | |
| **系统消息** | "X joined the group" / "X left" | 中 | 群聊场景常用 |
| 已删除 / 已编辑标记 | "This message was deleted"、名字后 "edited" | 低 | |
| 位置 / 文件 / 链接预览 | 地图卡片、文件卡、OG 卡片 | 低 | |
| 未读徽章 / 免打扰 | 列表页的蓝点、静音图标 | 低 | |

---

## 3. 用户体验缺口

| 问题 | 具体表现 | 优先级 |
|---|---|---|
| **移动端编辑器与预览分离** | 布局是 `grid-cols-1 lg:grid-cols-[380px_1fr]`，编辑器 `max-h-[78vh]`。<br>竖屏手机上首屏基本只有编辑器，**改文字时看不到预览，必须来回滚** | **高**（移动端是这类工具的主力流量） |
| **完全没有持久化** | 全仓 **0 处** `localStorage` / `sessionStorage`。<br>刷新、误关标签、切换平台 → 全部编辑内容丢失 | **高** |
| **没有模板载入** | `/examples` 只能"跳到对应生成器"，**不能把示例数据预填进编辑器**<br>（示例的价值被浪费了一半） | 中 |
| 没有撤销 | 无 undo / redo | 中 |
| 导出文件名写死 | 固定 `chatmock.png`，不随平台变（分享出去没有辨识度） | 低 |

---

## 4. 卡在账号上（技术侧做不了）

1. **GA4 填 ID** —— 线上 HTML 至今一条 `gtag` 都没有，流量数据从零开始积累
2. **AdSense 点验证** + **CMP（GDPR 消息）**—— 后者必须在广告位上线前开，否则 EEA/UK 流量降级为 Limited Ads
3. **GSC + Bing 提交**（清单见《上线提交清单-GSC与Sitemap》）
4. **Vercel Hobby → Pro**（广告展示即触发 fair use 违规）

---

## 5. 建议顺序

| 批次 | 内容 | 为什么排这里 |
|---|---|---|
| **P0** | ① title 重复（**已修**）② 移动端预览 ③ 本地持久化 ④ 示例库做厚 | 都是零/低成本、直接影响现有流量与转化，不依赖任何外部条件 |
| **P1** | ⑤ WhatsApp 端到端加密提示等保真细节 ⑥ Signal 页 ⑦ WhatsApp Status 工具页 ⑧ 示例库"一键载入" | 保真度直接服务产品定位；两个新页有明确词量支撑且**不依赖 i18n 工程** |
| **P2** | ⑨ 无下载截流页 ⑩ 补齐 5 篇平台指南 ⑪ TikTok DM 页 ⑫ 回复/表情/语音等消息形态 | 价值明确但要先出方案 |
| **P3** | ⑬ 西语 i18n（最大机会但最大工程） | 需要独立方案评审 |

**一条约束别忘了**：手册把页面数一期卡在 12 个、分批发布，为的是避免
scaled content abuse。所以加页要挑"**需求已证实 + 能写出真原创**"的，
不要为了铺量而铺量 —— 这个站已经被 AdSense 拒过 4 次，内容质量不能再赌。

---

## 附：本次盘点的可复现命令

```bash
# 关键词缺口（本报告 §1 的数据来源）
python3 scripts/analyze_keywords.py

# 线上 title / description 一致性
node scripts/site_audit.cjs          # DUP_TITLES / DUP_DESCS / CONSOLE_ERRORS
node scripts/qa/ldjson.cjs           # 结构化数据

# 功能与体验侧是代码走查，锚点：
#   渲染器能力   grep -rl "reply\|reaction\|voice" components/chats/
#   持久化       grep -rn "localStorage" components/ lib/ app/
#   布局断点     components/generator/GeneratorShell.tsx
#   导出         lib/export.ts
```
