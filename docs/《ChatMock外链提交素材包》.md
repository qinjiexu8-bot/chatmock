# ChatMock 外链提交素材包

> 站点：https://chatmock.net ｜ 素材最后更新：2026-09-11
> 配套机器可读文件：`chatmock/product.json`（执行端 `submitProfile` 口径，与 Kling3AI 同 schema）
> 执行规范见 skill `backlink-submission-execution`（五状态回写、两步式付费陷阱、ref 选择器坑）

---

## 1. 通用速填表（99% 的平台表单就这几个字段）

| 字段 | 填写值 |
|---|---|
| Product name | `ChatMock` |
| Full title | `ChatMock — Chat Mockup Generator` |
| Website / URL | `https://chatmock.net/` |
| Category | `Design & Social Media Tool` |
| Sub-category | `Mockup generator` / `Design tool` / `Social media tool` |
| Pricing | `Free` |
| Tagline | `Free chat mockup generator — no signup, no watermark` |
| Email | `thomaszx85531@gmail.com` |
| Twitter / X | ⚠️ **待定**（见第 7 节） |
| Launch date | 2026-09-11（可留空） |
| Signup required | No |
| Platforms supported | 10 messaging apps |
| Logo | `chatmock/ChatMock-logo-400.png`（或 512 版） |
| Screenshot | `chatmock/ChatMock-editor-whatsapp-1600x900.jpg`（首选产品图） |
| Banner | `chatmock/ChatMock-banner-1200x630.png` |

**一句话内核（所有文案都从这句展开）**：
> 10 个平台的拟真聊天截图生成器，免费、免注册、无水印，全部在浏览器本地渲染——你输入的内容不上传。

---

## 2. 描述文案（按字段长度直接复制）

### 2.1 微型（≤60 字符，用于卡片标题/短描述）
```
Realistic chat mockups for 10 messaging apps — free, no signup.
```

### 2.2 短（≤160 字符，meta description 级）
```
Create realistic chat screenshots for WhatsApp, iMessage, Instagram DM, Telegram, Discord and more — free, no signup, no watermark, 100% in your browser.
```

### 2.3 中（80–120 词，大多数目录站的 Description 字段）
```
ChatMock builds realistic chat mockups for 10 messaging platforms. Edit the contact name, status, avatar, timestamps, blue ticks and bubble style, then export a high-resolution PNG at 1x, 2x or 3x. Everything renders in your browser, so nothing is uploaded and the page keeps working offline.
```

### 2.4 长（300+ 词，用于 Product Hunt / 目录站详情页 / 独立页）
```
ChatMock is a browser-based chat mockup generator for 10 messaging platforms: WhatsApp, WhatsApp Call, iMessage, Messenger, Group Chat, Instagram DM, Snapchat, Telegram, Discord and Android SMS.

You control the contact name, status line, avatar, date, status-bar time, message text, blue ticks and timestamps, and can switch between light and dark mode before exporting a PNG at 1x, 2x or 3x.

The mockups are built to survive a close look — correct bubble radius, correct green and blue, correct timestamp placement, correct dark-mode behaviour — so they hold up in video overlays, ad creative, social posts and presentations.

Rendering happens entirely client-side: nothing is transmitted to a server and the tool keeps working after you disconnect from the internet. The core generator is free, with no account and no watermark.
```

### 2.5 中文版（中文目录站 / 中文导航站备用）
```
ChatMock 是一个拟真聊天截图生成器，支持 WhatsApp、iMessage、Instagram 私信、Telegram、Discord 等 10 个平台的聊天界面。可自由编辑联系人名称、状态、头像、时间戳、已读双勾和气泡样式，导出 1x / 2x / 3x 高清 PNG。全程在浏览器本地渲染，不上传任何内容，断网也能用；免费、免注册、无水印。
```

---

## 3. 关键词与锚文本方案

主推关键词（页面已有专门落地页，外链优先指向对应页）：

| 优先级 | 关键词 | 落地页 |
|---|---|---|
| P0 | chat mockup generator | `/` |
| P0 | fake chat generator | `/` |
| P1 | fake whatsapp chat generator | `/whatsapp-chat-generator` |
| P1 | fake text message generator | `/fake-text-message-generator` |
| P1 | instagram dm generator | `/instagram-dm-generator` |
| P2 | discord / telegram / snapchat chat generator | 对应子页 |

**锚文本配比**（防过度优化，按 100 条外链规划）：

| 类型 | 示例 | 占比 |
|---|---|---|
| 品牌词 | `ChatMock`、`ChatMock.net` | ~40% |
| 泛义词 | `this chat mockup tool`、`the site`、裸 URL | ~25% |
| 长尾自然句 | `a free chat mockup generator that runs in your browser` | ~20% |
| 精确匹配 | `chat mockup generator`、`fake chat generator` | ~15%（**不要超**） |

**首选深链**（避免全部指向首页，显得不自然）：
- `/whatsapp-chat-generator`（搜索量最大）
- `/fake-text-message-generator`
- `/instagram-dm-generator`

---

## 4. 平台专属模板

### 4.1 Product Hunt
- **Tagline（60 字符内）**：`Realistic chat mockups for 10 apps — free, no signup`
- **Topics**：Design Tools、Social Media、Privacy、Web App
- **Description**：用 2.4 长版
- **首条评论（maker comment）**：
```
Hi PH 👋 I built ChatMock because every chat mockup tool I tried either stamped a watermark on the output or asked me to upload my text to their server.

So this one does neither: all 10 platforms (WhatsApp, iMessage, Instagram DM, Telegram, Discord, Snapchat, Messenger, Group Chat, WhatsApp Call, Android SMS) render locally in your browser. Nothing is transmitted, and the page keeps working offline. The generator is free with no account and no export limit — a mockup with a watermark defeats the whole point.

Happy to answer anything about the rendering approach or the platform-accurate details (bubble radius, timestamp placement, dark-mode colours).
```
- ⚠️ 备注：PH 提交有投票/审核机制，**别追票**，重点是把 maker 评论写好

### 4.2 AlternativeTo
- **作为替代品提交给**：`Fake Chat Generator`、`Chat Screenshot Generator`、`Placeit` 等
- **描述**：用 2.3 中版
- **标签**：Chat、Mockup、Design Tools、Web App
- 说明：AlternativeTo 是"提交为某产品的替代品"，不是独立条目——语义匹配决定流量

### 4.3 SaaSHub / Uneed / Microlaunch / Toolify / Futurepedia 类目录
- 通用三件套：名称 + 2.2 短描述 + 2.3 中描述
- 分类尽量选 `Design` / `Social Media` / `Productivity`，**不要选 AI**（不是 AI 产品，选错分类会被归到无关榜单）
- 需要配图时：logo 用 400 版，截图用编辑器图

### 4.4 目录站的"定价"字段陷阱
一律填 `Free`，不要填 `Freemium`——站点目前**没有任何付费档**（无 pricing 页，官网原文：core generator is free, no account, no export limit；未来若加付费功能也是 additive，不削减免费档）。填 Freemium 会被部分站归进付费榜单，还可能触发"必须提供付费计划"的校验。

### 4.5 平台红线（提交时被问"允许什么内容"直接引用）
站点的 `acceptable-use` 页明确禁止生成伪造银行提醒、付款确认、发票、税务/政府文书、医疗记录、法院或警方通知、物流签收确认等**机构性文书**，也不做骚扰/诽谤/复仇类内容。被审核问到内容边界时主动引用这一条，能显著提高工具站在"诚信类"目录的通过率：
> ChatMock is not a tool for producing fake bank alerts, payment confirmations, invoices, tax or government communications, medical records, court or police notices, or shipping and delivery confirmations.

---

## 5. 通用外链/软文话术（reddit 回复、Quora、资源页投稿）

**一句话插入版**：
> I've been using ChatMock (chatmock.net) for this — it renders the mockup locally in the browser and doesn't watermark the export.

**资源页投稿版（cold outreach 邮件）**：
```
Subject: Free browser-based chat mockup tool for your [resource page name]

Hi [name],

I noticed your list of [design / content creation] tools — I built one that might fit the section on [mockups / social media tools].

ChatMock (https://chatmock.net) generates realistic chat mockups for 10 messaging platforms. Two things make it different from the tools usually listed: it renders entirely in the browser so nothing is uploaded, and exports carry no watermark even on the free tier.

Free, no signup: https://chatmock.net/

Happy to be skipped if it doesn't fit your criteria.

[signature]
```

⚠️ **纪律**：reddit/Quora 回复必须先有真实价值内容再提工具，纯链接帖会被判 spam 且可能连累域名。资源页投稿每次都是独立邮件，不要群发同一模板。

---

## 6. 提交纪律（复用执行端 skill 的坑清单）

1. **两步式付费陷阱**：首步只收 name/url/email 看似免费，`Continue` 后直接进付费墙（实测 magicbox.tools 三档全付费）。**判定必须走到第二步**，不能停在首屏就回写"发布成功"。
2. **发现端"免费"字段不可信**：以实测为准，冲突时在平台文档写「发现端修正建议」。
3. **点击后 URL 不变 ≠ 成功**：可能是按钮无响应或 SPA 未渲染，先 wait 再复查 `document.querySelectorAll('form').length`。
4. **五状态口径**：发布成功 / 等待审核 / 付费推广 / 要求互链 / 人工介入。
   成功 = **验证到真实公开链接**，不是点了按钮。
5. **强制互链的直接放弃**：要求挂 badge / 首页回链才能免费收录的，一律不换（这条与竞品分析端的「名气站强制互链判非目标」同一口径）。
6. **Phantom 反爬**：producthunt.com / substack.com 这类用脚本会判"不可达"，是反爬不是站点死了，别急着回写 `[站点异常]`。

---

## 7. 待补项（**需要你确认/提供，会影响提交完整性**）

| 项 | 现状 | 影响 |
|---|---|---|
| **Twitter / X 账号** | 空 | 相当比例目录站要求填社交账号，留空会降低审核通过率；建议注册 `@chatmock` 或类似 handle |
| **GA4 测量 ID** | 未接线（线上 0 埋点） | 外链带来多少流量、哪些目录站有效——**没有 GA4 就等于瞎子**，建议先补 |
| **提交统一邮箱** | `thomaszx85531@gmail.com` | 已按你的指纹隔离约定固定；Google 默认账号 `FosterMartyn735@gmail.com` 用于有头浏览器登录 |
| 是否有 Product Hunt 账号 | 未确认 | PH 需要账号且账号有一定活跃度才不易被限流 |

---

## 8. 素材文件索引（`chatmock/` 目录）

| 文件 | 尺寸 | 用途 |
|---|---|---|
| `ChatMock-logo-400.png` | 400×400 | 目录站 logo 字段（标准尺寸） |
| `ChatMock-logo-512.png` | 512×512 | 需要更大 logo 的平台 |
| `ChatMock-banner-1200x630.png` | 1200×630 | OG / 站点头图字段 |
| `ChatMock-banner-whatsapp-1200x630.png` | 1200×630 | 展示真实产品效果的横幅 |
| `ChatMock-editor-whatsapp-1600x900.jpg` | 1600×900 | **首选产品图**（编辑器 + 手机预览同框） |
| `ChatMock-home-1600x900.jpg` | 1600×900 | 首页 hero |
| `ChatMock-examples-1600x900.jpg` | 1600×900 | 多平台展示页 |
| `product.json` | — | 执行端机器可读配置（submitProfile + 素材路径） |

远程图（平台要求填 URL 而非传文件时用）：
- Logo：`https://chatmock.net/apple-icon.png`
- Banner：`https://chatmock.net/opengraph-image`
- 生成器 OG：`https://chatmock.net/og/whatsapp-chat-generator`
