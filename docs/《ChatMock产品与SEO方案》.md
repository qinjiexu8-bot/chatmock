# ChatMock 产品与 SEO 方案

> 项目：虚假聊天记录生成器 Web 站
> 域名：chatmock.net（.com / .app 已被注册，.net / .design / .io 可注册，选 .net）
> 部署：Vercel ｜ 面向市场：Google / Bing，英文 + 西语 + 葡语（巴西）
> 版本：v1.0 ｜ 2026-09-10

---

## 一、项目定位

**一句话**：一个 100% 浏览器端运行的聊天截图 mockup 生成器，免费、无需注册、无水印，数据不出本地。

**目标用户**（按价值排序）：
1. YouTube / TikTok 内容创作者——需要对话截图做叙事素材
2. 社媒运营与营销——产品对话场景的可视化
3. 编剧 / 影视分镜——剧本里的对话界面参考
4. UI 设计师 / 产品经理——App 原型演示素材
5. 教师 / 培训——数字素养、反诈教学示例

**明确不做**：假证件、银行/支付通知、政府税务文件、医疗文书、发票账单、快递物流通知、法律文书。见第八章合规红线。

---

## 二、竞品格局与我们的差异化

### 2.1 实测数据（2026-09-10 curl 源码检测）

| 站点 | 首页体积 | 广告网络 | 平台数 | 备注 |
|---|---|---|---|---|
| thefake.design | 205KB | 无 | 45+ | 有 Pro 付费（视频导出），4 语言 |
| heyfake.com | 251KB | 无（自称无展示广告） | ~4 | 主打 100% 客户端 + 纯净体验 |
| getmockly.com | 113KB | 无 | 50+ | 上过 TechCrunch，免费版带水印 |
| prankshit.com | 169KB | 无（自称 no ads） | 5 | 老牌，UI 粗糙 |
| fakedetail.com | 147KB | 未检出 | 20+ | 老牌，品类最全 |
| **zeoob.com** | 163KB | **AdSense 在跑** | 8 | **AdSense 过审的活案例** |
| fakewhats.com | 1.5KB | 被挡 | 1 | 纯广告站，UI 过时 |

### 2.2 关键结论

**"免费 + 无需注册"不是卖点，是入场券。** thefake.design 本身就是无注册、无水印 PNG 免费导出；heyfake 更极端（无广告 + 100% 客户端）。照抄这个定位等于站在它的格子里硬碰硬，而它有 45+ 页面、四语言、先发年龄和外链积累。

### 2.3 我们的三个差异化支点

1. **像素级还原 + 平台 UI 深度拆解内容**。竞品要么 UI 停在 2022 年（fakewhats），要么只做表面（zeoob）。我们把每个平台的真实 UI 参数（气泡色值、字号、回执语义、状态栏）做成页面上的公开内容——既是内容资产，也是对"做真实 mockup"用户的实质价值。
2. **西语 / 葡语做本地化 slug，不做机翻**。竞品只把首页 + 4 个核心页机翻了事，长尾几乎空白。`gerador de conversa falsa whatsapp` 这类词难度远低于英文版，而巴西、墨西哥是 WhatsApp 最大市场。
3. **隐私作为产品特性而非文案**。100% 客户端渲染写进隐私页、写进 schema、写进每个页面的信任区块。竞品中只有 heyfake 明确主张，且它没做多语言。

---

## 三、信息架构与 URL 结构

### 3.1 英文主站（默认语言，无前缀）

```
/                                  首页（聚合入口 + 平台选择）
/whatsapp-chat-generator           WhatsApp
/imessage-generator                iMessage
/instagram-dm-generator            Instagram DM
/messenger-chat-generator          Facebook Messenger
/telegram-chat-generator           Telegram
/discord-chat-generator            Discord
/snapchat-chat-generator           Snapchat
/signal-chat-generator             Signal
/android-sms-generator             Android SMS
/ios-sms-generator                 iOS 经典短信（绿气泡，与 iMessage 区分）
/x-dm-generator                    X (Twitter) DM
/tiktok-dm-generator               TikTok DM

/platforms                         平台总览
/examples                          示例画廊（二期）
/blog                              内容中心（二期）
/privacy  /terms  /acceptable-use  /about  /contact
```

**说明**：URL 沿用 thefake.design 验证过的 `/{platform}-chat-generator` 与 `/imessage-generator` 混合模式。URL 一旦上线不可改，定稿前最后一次确认机会就是现在。

### 3.2 多语言结构（本地化 slug）

```
/es/                                    西语首页
/es/generador-chat-whatsapp
/es/generador-imessage
/es/generador-dm-instagram

/pt-br/                                 葡语（巴西）首页
/pt-br/gerador-conversa-whatsapp
/pt-br/gerador-imessage
/pt-br/gerador-dm-instagram
```

**为什么用本地化 slug 而不是 `/es/whatsapp-chat-generator`**：竞品图省事保留了英文 slug。本地化 slug 在本地搜索引擎是弱排名信号，更重要的是本地用户的点击率明显更高。一期只做 3 个最高价值页面/语言，成本可控。

### 3.3 hreflang 规则

每个页面必须输出完整三向回链 + x-default：

```html
<link rel="alternate" hreflang="en"      href="https://chatmock.net/whatsapp-chat-generator" />
<link rel="alternate" hreflang="es"      href="https://chatmock.net/es/generador-chat-whatsapp" />
<link rel="alternate" hreflang="pt-BR"   href="https://chatmock.net/pt-br/gerador-conversa-whatsapp" />
<link rel="alternate" hreflang="x-default" href="https://chatmock.net/whatsapp-chat-generator" />
```

- 区域码只写 `pt-BR`，不写泛化 `pt`（巴西是唯一目标市场，写泛 pt 会稀释）
- 西语只写 `es`，不写 `es-MX` / `es-ES`（一期不区分区域变体）
- **只有 3 个平台有三语版本**，其余 9 个页面只输出 `en` + `x-default`，不做半吊子翻译

---

## 四、12 个平台页清单与优先级

### 4.1 实测数据（2026-09-10，Google Autocomplete，1615 个真实搜索词）

数据源说明：Semrush Analytics API 不可用（`ERROR 122`，Backlinks API v3 权限不覆盖 Analytics，属套餐问题）。改用 Google Autocomplete 全量采集——真实用户搜索行为，403 个种子查询、2260 条原始记录、去重 1615 词，覆盖 en(us) / es / mx / pt-br 四个地区。

**`热度` = 该词在多少个不同种子查询的下拉结果里复现**，是热度代理指标（无绝对搜索量，但排序可靠）。

| 平台 | 词数 | 热度 | v1.0 我的经验判断 | 校准结果 |
|---|---|---|---|---|
| WhatsApp | 432 | **598** | 最高 | ✓ 正确，绝对主导（是第 2 名的 1.5 倍） |
| SMS / Text（通用） | 278 | **398** | — | 需求分散在通用词，量很大 |
| iPhone / iOS + iMessage | 172 | **297** | iMessage 排第 2 | ✗ **iMessage 单列被严重高估** |
| Messenger | 70 | 86 | 中（第 6） | ↑ **低估，实际第 4** |
| Discord | 55 | 69 | 中低（第 10） | ↑ **低估，实际第 5** |
| Telegram | 37 | 53 | 中（第 7） | ✓ 正确 |
| Android | 45 | 53 | 中高（第 4） | ↓ 略高估 |
| Instagram DM | 39 | 52 | 中高（第 3） | ↓ **高估** |
| Snapchat | 40 | 42 | 中（第 5） | ↓ 略高估 |
| Signal | 13 | 22 | 低（第 12） | ✓ 正确 |
| TikTok DM | 12 | 14 | 中低（第 9） | ✓ 正确 |
| Facebook | 2 | 2 | — | 无独立需求 |
| X / Twitter | 1 | 1 | 中低（第 11） | ✗✗ **几乎无需求，砍掉** |

**三条关键修正：**

1. **用户不搜 "iMessage"，搜 "iphone text" / "iphone message"。** iMessage 单列只有 46 词，而 iphone/ios 类有 126 词。二者是同一视觉体系（iMessage 蓝气泡 / SMS 绿气泡），**必须合成一个页面吃两类词**，拆开做会两头都弱。
2. **X (Twitter) DM 砍掉。** 全量 1615 词里只有 1 个相关词。原方案给它留了一整个页面，纯浪费。
3. **Discord 和 Messenger 被低估。** Discord 69 > iMessage 65；Messenger 86 排第 4，且在巴西葡语区热度排进前 3（`chat falso messenger online`）。

### 4.2 校准后的 12 页清单

| # | 页面 | URL slug | 实测热度 | 批次 |
|---|---|---|---|---|
| 1 | WhatsApp Chat | `/whatsapp-chat-generator` | 598 | P0 |
| 2 | iMessage / iPhone Text | `/imessage-generator` | 297（合并） | P0 |
| 3 | Facebook Messenger | `/messenger-chat-generator` | 86 | P0 |
| 4 | Text Message / SMS（通用） | `/text-message-generator` | 398 | P1 |
| 5 | Android SMS | `/android-sms-generator` | 53 | P1 |
| 6 | Discord | `/discord-chat-generator` | 69 | P1 |
| 7 | Telegram | `/telegram-chat-generator` | 53 | P1 |
| 8 | Instagram DM | `/instagram-dm-generator` | 52 | P1 |
| 9 | **群聊生成器（新增）** | `/fake-group-chat-maker` | 117 | P1 |
| 10 | Snapchat | `/snapchat-chat-generator` | 42 | P2 |
| 11 | **WhatsApp 通话记录（新增）** | `/whatsapp-call-generator` | 56 | P2 |
| 12 | TikTok DM | `/tiktok-dm-generator` | 14 | P2 |

**新增两页的依据**（均来自意图热度实测，见 4.3）：
- **群聊 117**：`fake group chat generator` / `fake group chat maker` 都是下拉第一位（★），原方案把它放二期是错的
- **WhatsApp 通话记录 56**：`fake whatsapp call` 是下拉第一位（★）

**砍掉**：X/Twitter DM（1 词）。
**延后二期**：Signal（22）、WhatsApp Status（67，可作为 WhatsApp 页内功能先上）。

### 4.3 意图热度（用户到底要什么功能）

| 意图 | 词数 | 热度 | 决策影响 |
|---|---|---|---|
| app / apk | 491 | 685 | ⚠️ 大量用户要的是"能发假消息的 App"，不是截图工具。我们不提供，但可写 "no app needed" 内容截流 |
| generator | 237 | 366 | 主词，每页必含 |
| **online / free** | 183 | **272** | ✓ **直接验证"免费+无需注册"定位**，且是西葡市场最高频修饰词 |
| maker | 155 | 250 | 同 generator，做同义覆盖 |
| screenshot | 98 | 139 | 每页必含 |
| **video** | 67 | **118** | 视频导出需求不低，二期优先级上调 |
| **group（群聊）** | 73 | **117** | ✓ **提到一期**（原在二期） |
| creator | 56 | 89 | 同义覆盖 |
| status | 37 | 67 | WhatsApp 状态，先做页内功能 |
| prank | 46 | 60 | 内容角度可用 |
| editor | 36 | 60 | — |
| call（通话） | 41 | 56 | ✓ 新增页面 |
| template | 27 | 31 | — |
| voice / audio | 11 | **11** | ✗ **需求最低，一期不做，可永久不做** |

### 4.4 西语 / 葡语：假设需要修正

**v1.0 假设**：西葡是空白机会。
**实测**：不是空白。`chatfalso.com` 是西语起家的专精玩家，5 语言（es/pt-br/en/de/it）、每语言独立原创 blog、免费无广告无水印——**但它只做 WhatsApp 一个平台**。

**修正后的西葡策略**：
- 正面避开 WhatsApp（chatfalso 已占，且做得不差）
- 主攻它没做的平台。实测西葡区确实有非 WhatsApp 需求：`chat falso de instagram`、`conversación falsa instagram`、`conversacion falsa messenger`、`chat falso de tiktok`
- 巴西葡语热度显著高于西班牙西语（最高热度 6 vs 3），**pt-br 优先级高于 es**
- `chat falso messenger online` 在巴西排第 3 —— Messenger 是葡语区第 3 热平台，与英文区一致
- **西葡最高频修饰词是 `online` 和 `gratis/grátis`**，落地页标题必须带，不能直译英文

**P0 三页的西葡版本**：WhatsApp（防守，必须做）、Messenger（进攻，竞品空白）、Instagram DM（进攻，竞品空白）。

---

## 五、每页内容规格（AdSense 过审硬性要求）

用户 AdSense 已因 *low value content* 被拒 4 次。工具站是撞这条的头号形态——审核员看到"一个工具 + 三段说明文字"就拒。**本项目的过审前提是每个生成器页达到以下规格，一条都不能省。**

### 5.1 内容结构（每页 800–1500 词原创）

| 区块 | 要求 | 字数参考 |
|---|---|---|
| H1 + 一句话定位 | 含主关键词，非模板套话 | 30 |
| **工具本体** | 编辑器（见第七章） | — |
| How to make a [平台] chat | 4–6 步，含真实操作细节 | 250–400 |
| **平台 UI 细节拆解** | 气泡色值 hex、字号、圆角、回执语义、状态栏特征、明暗色差异 | 300–500 |
| 使用场景 | 3–5 个具体场景（不说空话） | 150–250 |
| FAQ | 6–8 条，平台特有，不跨页复用 | 300–500 |
| 免责 + 商标声明 | 见 5.3 | 100 |
| 相关生成器内链 | 3–5 条 | — |

**"平台 UI 细节拆解"是全套内容的核心**。它天然独特（12 个平台的 UI 参数互不相同）、对真实用户有信息价值、且无法被 AI 批量套模板——这正是对抗 low value content 判定最有效的部分。

### 5.2 结构化数据（每页必带）

- `WebApplication`（name、applicationCategory、operatingSystem: "Any"、offers.price: 0、priceCurrency: USD）
- `FAQPage`（对应页面真实 FAQ）
- `HowTo`（对应 how-to 区块）
- `BreadcrumbList`

### 5.3 商标与免责声明（每页页脚，不可省）

> Not affiliated with, endorsed by, or connected to [平台方]. [平台名] is a trademark of [权利方]. All generated content is fictional and for entertainment, education, and design mockup purposes only. Do not use to mislead, defraud, harass, or misrepresent.

这条既是商标合规要求（降低 DMCA / 侵权投诉风险），也是 AdSense 审核的正面信号。

### 5.4 站点级必备页面

- `/privacy` —— 必须明确"所有内容在浏览器本地处理，不上传服务器"，这是核心卖点
- `/terms`
- `/acceptable-use` —— 禁止用途清单，见第八章
- `/about`、`/contact` —— 真实联系信息，AdSense 审核看这个

---

## 六、技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | **Next.js 15（App Router）+ TypeScript** | SSG/ISR，SEO 友好，Vercel 原生 |
| 样式 | **Tailwind CSS v4** | — |
| i18n | **next-intl** | App Router 支持成熟，支持本地化路由 |
| 状态 | **Zustand** | 会话数据模型（见 7.1）跨组件共享 |
| 导出 | **modern-screenshot** | 见下方选型说明 |
| 部署 | **Vercel** | 免费额度对静态站绰绰有余 |
| 分析 | **GA4 + Google Search Console + Vercel Analytics** | — |

### 6.1 导出库选型（踩坑预警）

三个候选：

| 库 | 评价 |
|---|---|
| `html2canvas` | **不要用**。不支持 oklch 颜色，Tailwind v4 默认输出 oklch，会直接渲染错色或崩 |
| `html2canvas-pro` | 可用，修了 oklch，但基于 Canvas 重绘，复杂布局易偏移 |
| **`modern-screenshot`** | **首选**。基于 SVG foreignObject，速度快、保真度高、对现代 CSS 支持最好 |

降级方案：modern-screenshot 在个别 Safari 版本上对 web font 有兼容问题，需做字体 preload + `document.fonts.ready` 等待，导出前强制 await。

### 6.2 导出规格

- 默认 `pixelRatio: 2`，提供 1x / 2x / 3x 选项
- 输出 PNG，文件名 `{platform}-chat-{timestamp}.png`
- 通过 Blob + `URL.createObjectURL` 本地下载，**不经过服务器，不消耗 Vercel 带宽**
- 导出前必须 await `document.fonts.ready`，否则字体回退导致排版错乱

---

## 七、功能模块规格（一期）

### 7.1 统一数据模型（关键工程决策）

12 个平台共用**同一套会话数据模型**，只换主题配置。这是能快速扩展平台的前提。

```ts
type Conversation = {
  platform: PlatformId
  theme: 'light' | 'dark'
  participants: Participant[]        // 1-on-1 或群聊
  messages: Message[]
  statusBar: StatusBarConfig         // 时间、电量、信号、运营商
  header: HeaderConfig               // 头像、名称、在线状态/最后上线
}

type Message = {
  id: string
  senderId: string
  text?: string
  image?: string                     // dataURL，本地
  timestamp: string
  receipt?: 'sent' | 'delivered' | 'read'   // 平台差异由 theme 决定是否渲染
}

type PlatformTheme = {
  id: PlatformId
  name: string
  colors: { incomingBubble, outgoingBubble, incomingText, outgoingText, background, headerBg }
  bubble: { radius, maxWidth, fontFamily, fontSize }
  features: { receipt: boolean, avatar: boolean, typingIndicator: boolean, reactions: boolean }
  statusBarStyle: 'ios' | 'android' | 'none'
  trademark: { name: string, owner: string }
}
```

新增一个平台 = 新增一份 `PlatformTheme` + 一个渲染组件，**不改数据模型**。

### 7.2 一期功能清单

**必做**
- 文本消息发送/接收切换
- 参与者：头像上传、名称、在线状态/最后上线时间
- 每条消息独立时间戳
- 已读回执（按平台 theme 决定是否显示：WhatsApp 双蓝勾、iMessage "Delivered/Read"、IG 已读）
- 明暗主题切换
- **图片消息**（用户已确认包含）
- 状态栏自定义：时间、电量、信号、运营商/WiFi
- 消息增删改排序
- PNG 导出（1x/2x/3x）
- localStorage 自动保存草稿（无注册，本地留存是唯一方案）

**一期新增（依据 4.3 意图实测，已从二期上调）**
- **群聊**：多参与者 + 彩色发送者名（热度 117，`fake group chat generator` 为下拉首位）。竞品普遍做得差，是差异点
- **WhatsApp 通话记录**：来电/去电/未接/已接通四种状态屏（热度 56，`fake whatsapp call` 为下拉首位）

**二期**
- 视频 / 动画导出（热度 118，需求不低，但工程量大）
- WhatsApp Status 屏（热度 67）
- 引用回复、反应表情（reactions）

**明确不做**
- **语音消息气泡**：实测热度仅 11，是全部意图里最低的。投入产出比最差，可永久不做
- 正在输入动画（装饰性，不影响搜索）

### 7.3 编辑器布局

桌面：左侧配置面板（参与者 + 消息列表编辑）+ 右侧实时预览（手机外框）。
移动：上下分栏，预览吸顶。

---

## 八、合规与风险控制

### 8.1 AdSense 相关（重要）

**结论：可以过审。zeoob.com 目前就挂着 AdSense**（源码检出 `adsbygoogle` + `googlesyndication` + `doubleclick`），这是品类的活案例。Google Publisher Policies 禁止的是 *illegal content*、*misrepresentative content*、*counterfeit goods*——针对能用于真实欺诈的假证件、假政府公文、假银行对账单。聊天截图 mockup 属娱乐/设计素材，不在禁区。

**但收益预期要诚实**：工具类站 + 一次性使用 + 西葡流量占比高，RPM 偏低。英文 $2–4、西语/葡语 $1–2。月 3 万 PV（新域名 12 页 × 3 语言的现实 6 个月预期）约 **$60/月**；乐观 10 万 PV 约 $200/月。

**接入策略（推荐）**：
- 一期不挂广告，先跑 3–6 个月做扎实内容与收录，再去申请
- 过审后只放页脚与侧栏，**工具区上方绝不放**——竞品因广告压住工具被用户骂才转向付费模式
- 申请前必须确保 12 个页面全部达到第五章内容规格

**红线（碰到即永久封号）**：
模板与示例中绝不出现——银行/支付通知、政府税务文件（IRS 等）、医疗机构、发票账单、快递物流通知、法律文书。thefake.design 做了邮件 mockup（Gmail/Outlook/Apple Mail）但**刻意避开银行与政府**，这不是巧合。

### 8.2 输入侧控制

- 前端关键词黑名单（bank, IRS, invoice, passport, visa, prescription, court, subpoena, 及各语言等价词）
- 命中时给出软提示（不硬阻断，避免过度设计影响体验），但记录到 `/acceptable-use` 的声明链路
- `/acceptable-use` 页面明确列出禁止用途：不得用于欺骗、诈骗、骚扰、诽谤、伪造证据、冒充他人

### 8.3 Google SEO 风险：Scaled Content Abuse

**这是本项目最大的 SEO 风险。** 新域名若铺 45 个模板页且内容雷同，是教科书级的规模滥用，几乎必死。

对冲措施：
1. 一期严格限制在 12 页，不做 programmatic 批量生成
2. 每页的"平台 UI 细节拆解"必须真实、具体、互不相同
3. FAQ 不跨页复用
4. 西语/葡语只做 3 页真实本地化，不做 12 页机翻
5. 上线节奏上，P0/P1/P2 分批发布（每周一批），不要一天内丢 12 个页面上站点地图

---

## 九、上线节奏

| 阶段 | 内容 | 产出 |
|---|---|---|
| **W1** | 项目骨架、主题引擎、数据模型、导出链路、WhatsApp 第一个平台跑通 | 一个能用的 WhatsApp 生成器 |
| **W2** | 剩余 11 个平台主题 + 编辑器功能补全 + 明暗主题 + 图片消息 | 12 个生成器 |
| **W3** | 内容填充（12 页 × 全套规格）、sitemap/robots、结构化数据、三语框架 | 内容达标 |
| **W4** | 西语/葡语各 3 页、hreflang、首页聚合页、GSC 提交、Bing Webmaster 提交 | **正式上线** |
| **M2–M6** | 内容扩充、外链建设、收录监控、按数据决定 AdSense 申请时机 | — |

发布节奏上 P0/P1/P2 分批上线（每周一批），避免一次性提交 12 个页面。

---

## 十、验收指标

| 指标 | 目标 | 观测方式 |
|---|---|---|
| 索引率 | 提交后 30 天内被索引 ≥ 80% | GSC 页面报告 |
| 首批关键词排名 | 3 个月内主词进前 50 | GSC / Semrush |
| 访问 → 导出转化率 | ≥ 15% | GA4 事件 |
| 导出成功率 | ≥ 99%（无字体/渲染报错） | 前端错误上报 |
| 平均停留时长 | ≥ 90 秒 | GA4 |
| 跳出率 | ≤ 65% | GA4 |

**数据基线**：上线后 30 天建 baseline，之后按月对比。指标不达标时优先查内容规格是否缩水，而不是加页面。

---

## 十一、待定项（需确认）

1. **关键词真实数据** —— 第四章的流量量级是经验判断，需用 Semrush 拉取真实搜索量与 KD 替换。项目侧已有 Semrush API key，可批量跑。
2. **域名注册** —— chatmock.net 确认可注册，需尽快锁定。
3. **12 个平台的 UI 参数来源** —— 需要逐个核对当前版本 App 的真实 UI（气泡色值、字号、回执样式）。来源是各平台官方设计资源 + 真机截图。这一项直接影响"像素级还原"这个核心卖点，也直接决定内容质量。
4. **是否预留 API 化** —— thefake.design 做了 `/developers` + `/whatsapp-chat-api`，说明这条路被验证过。一期不做，但数据模型已按可扩展设计，二期可加。
5. **AdSense 与导流的取舍** —— 第八章给了数据，如果最终目标是给 Kling3AI 导流（单次 $9.9 转化 ≈ 3000 次广告点击），则 AdSense 可以完全不接，页面会更干净、转化更高。这个取舍建议在上线前定。
