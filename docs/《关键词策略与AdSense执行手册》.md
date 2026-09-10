# 关键词策略与 AdSense 执行手册

> ChatMock (chatmock.net) ｜ v1.0 ｜ 2026-09-10
> 配套文档：《ChatMock产品与SEO方案》v1.1

---

## 第 0 章 数据源说明（先说清楚数据是怎么来的）

**Semrush 用不了，这是事实，不是我没试。**

```
api.semrush.com/?type=phrase_this  →  ERROR 122 :: WRONG FORMAT OR EMPTY KEY
api.semrush.com/api/backlink_data/overview  →  HTTP 400
```

原因：项目里的 `SEMRUSH_API_KEY`（已确认存在且格式合法、43 位纯字母数字）是 **Backlinks API v3** 的凭据，而关键词数据属于 **Analytics API**——这是 Semrush 两个独立付费产品，权限不通用。要用关键词接口得单独买 Analytics API 套餐（约 $200/月起）。

**所以改用 Google Autocomplete 全量采集**，理由：

| | Semrush 估算 | Google Autocomplete |
|---|---|---|
| 数据性质 | 模型推算 | **Google 自己的下拉，真实用户行为** |
| 绝对搜索量 | 有 | 无 |
| 相对热度排序 | 有 | **有（结果按流行度排序）** |
| 长尾发现能力 | 一般 | **强（a-z 全字母扩展）** |
| 地区化 | 需切 database | **直接 gl/hl 参数** |
| 成本 | $200+/月 | 免费 |

**采集规模**：403 个种子查询 → 2260 条原始记录 → **去重 1615 个真实搜索词**，覆盖 en(us)=1472 / es=93 / br=74 / mx=59。

**指标定义**：
- `热度` = 该词在多少个不同种子查询的下拉结果里复现。这是热度代理，**无绝对搜索量，但排序可靠**
- `★` = 该词在某个种子查询的下拉里排第 1 位

**已知局限（不回避）**：
1. 没有绝对搜索量，只有相对热度。需要用 GSC 实测数据回填校准（见第 6 章）
2. Autocomplete 有个性化/地区化偏差，已通过固定 `gl`/`hl` 控制
3. 种子词由我设计，可能遗漏某些需求角度——第 6 章给了迭代机制

---

## 第 1 章 关键词总表：页面 → 目标词映射

### 1.1 P0 三页（第 1 周上线，内容投入最大）

#### ① `/whatsapp-chat-generator`（热度 598，占比 32.6%）

**主词**：fake whatsapp chat generator ｜ fake whatsapp chat ★ ｜ fake whatsapp conversation ★

| 关键词 | 热度 | 位置 |
|---|---|---|
| fake whatsapp contact | 9 | 正文 H2 |
| fake whatsapp chat | 6 ★ | **Title 开头** |
| fake whatsapp chat generator | 6 | **H1** |
| fake whatsapp conversation | 5 ★ | H2 |
| fake whatsapp chat maker | 5 | 正文 |
| create whatsapp conversations | 4 | H2 |
| fake whatsapp chat video | 4 | FAQ |
| fake whatsapp status maker free | 4 | FAQ |

- **Title**：`Fake WhatsApp Chat Generator — Free, No Signup, No Watermark`
- **H1**：`Fake WhatsApp Chat Generator`
- **Meta Desc**：`Create realistic fake WhatsApp conversations in your browser. Blue ticks, timestamps, light & dark mode. Free, no signup, no watermark, nothing uploaded.`

#### ② `/imessage-generator`（热度 297，占比 16.2%）

**关键决策**：用户不搜 "iMessage"，搜 "iphone text / iphone message"。iMessage 单列仅 46 词，iphone/ios 类 126 词。**一页吃两类词，不做拆分页。**

| 关键词 | 热度 | 位置 |
|---|---|---|
| fake iphone message generator | 7 ★ | **Title 开头** |
| fake iphone message creator free | 6 | H2 |
| fake iphone text generator app | 5 | FAQ |
| fake iphone text message generator | 5 | 正文 |
| fake imessage generator | 4 ★ | **H1（副标题）** |
| fake iphone text generator | 4 ★ | H2 |
| fake iphone text conversation | 4 ★ | H2 |
| fake text message generator iphone | 4 | 正文 |

- **Title**：`Fake iPhone Text & iMessage Generator — Free Online`
- **H1**：`Fake iPhone Text Message Generator`（H1 主攻 iphone text，页面内 H2 覆盖 iMessage）
- 页面内必须同时说明 iMessage（蓝气泡）与 SMS（绿气泡）的区别——这是真实用户的困惑点，也是天然独特内容

#### ③ `/messenger-chat-generator`（热度 86，占比 4.7%）

英文热度中等，但**葡语区排第 3**（`chat falso messenger online` 热度 5），是西葡进攻主力。

- **主词**：fake messenger maker online ｜ fake messenger chat generator
- **Title**：`Fake Messenger Chat Generator — Free, No Signup`

### 1.2 P1 六页（第 2 周）

| 页面 | slug | 热度 | 主词 | 备注 |
|---|---|---|---|---|
| Text/SMS 通用 | `/text-message-generator` | 398 | `fake text message generator` ★（5）<br>`generate fake text messages`（5）<br>`can you make fake text messages`（9）<br>`can you fake text messages`（7） | **第 2 大流量页**。`can you...` 类疑问词热度极高，必须做 FAQ 覆盖 |
| 群聊 | `/fake-group-chat-maker` | 117 | `fake group chat generator` ★（4）<br>`fake group chat maker` ★（4）<br>`fake group chat creator`（3） | **原方案放二期是错的**，多条下拉首位，且竞品普遍做得差 |
| Discord | `/discord-chat-generator` | 69 | `fake discord chat`（3）<br>`fake discord chat editor` | 被 v1.0 低估，实际高于 iMessage 单列 |
| Telegram | `/telegram-chat-generator` | 53 | `fake telegram chat`（3） | |
| Android SMS | `/android-sms-generator` | 53 | `fake text message conversation android` | |
| Instagram DM | `/instagram-dm-generator` | 52 | `fake chat generator instagram`（3） | 英文一般，**但西葡有独立需求** |

**`/text-message-generator` 特别说明**：`can you make fake text messages`（热度 9，全表最高）和 `can you fake text messages`（7）说明大量用户以**疑问句**搜索。这页的 FAQ 必须直接以疑问句作为 H3，例如 "Can you make fake text messages?"、"Is it legal to make a fake text message?"——这是低成本高回报的长尾截流。

### 1.3 P2 三页（第 3 周）

| 页面 | slug | 热度 | 主词 |
|---|---|---|---|
| Snapchat | `/snapchat-chat-generator` | 42 | fake snapchat chat video |
| WhatsApp 通话 | `/whatsapp-call-generator` | 56 | `fake whatsapp call` ★（4） |
| TikTok DM | `/tiktok-dm-generator` | 14 | fake chat dm tiktok |

### 1.4 已砍 / 延后

| 原计划 | 处理 | 依据 |
|---|---|---|
| X (Twitter) DM | **砍掉** | 全量 1615 词中仅 1 个相关词 |
| Signal | 延后二期 | 热度 22，低于所有 P1 页 |
| WhatsApp Status | 延后二期（先做页内功能） | 热度 67，不足以单独成页 |
| 语音消息 | **不做** | 热度 11，全部意图中最低 |

---

## 第 2 章 意图层策略（跨页面复用）

### 2.1 `free` / `online` / `no signup` 是核心转化词

实测热度 272（183 词），是第三高意图，**直接验证产品定位**。

落地要求：
- 每个页面的 Title 必须含 `Free`
- 首屏可见位置必须有 "No signup · No watermark · Nothing uploaded" 三连
- 这三个词必须出现在 H1 或首段，不能只写在页脚

### 2.2 ⚠️ `app` / `apk` 是最大意图（685）但我们不提供

`fake chat app`、`fake text app`、`fake whatsapp apk`、`fake chat conversation mod apk` 热度合计 685，是**全部意图里最高的**。

这意味着相当一部分搜索者要的是"能真正发出假消息的 App"，而不是截图生成器。

**处理策略（不回避，主动截流）**：
1. **不做 App**。App 是另一个战场（ASO + 应用商店审核 + 隐私合规），一期不做
2. 每页 FAQ 加一条：`Do I need to download an app?` —— 明确回答"No, works in browser"，把这部分流量转化为网页用户
3. 二期可考虑博客文章 `Fake Chat App vs Online Chat Generator` 主动截流

### 2.3 `video`（118）与 `group`（117）

- **群聊**：提到一期（原在二期），依据是多词下拉首位 + 竞品普遍做得差
- **视频**：热度不低但工程量大（MediaRecorder 录 canvas 或逐帧导出），放二期，但**内容上先占位**——WhatsApp 页 FAQ 加 "Can I export as video?"，回答 "coming soon" 并留邮箱订阅位

---

## 第 3 章 西语 / 葡语策略（已修正）

### 3.1 假设修正

| | v1.0 判断 | 实测 |
|---|---|---|
| 西葡市场 | 空白机会 | **不是空白**。`chatfalso.com` 西语起家，5 语言（es/pt-br/en/de/it），每语言独立原创 blog，免费无广告无水印 |
| 单点爆破 WhatsApp | 推荐策略 | **在西葡区已被 chatfalso 占了** |

**但 chatfalso 只做 WhatsApp 一个平台** —— 这就是空位。

### 3.2 修正后的西葡打法

**进攻方向**：它没做的平台。

实测西葡区确实存在非 WhatsApp 需求：

| 市场 | 词 | 热度 |
|---|---|---|
| es | chat falso de instagram | 2 |
| es | conversación falsa instagram | 2 |
| es | generador chat falso instagram | 2 |
| es | conversacion falsa messenger | 2 |
| es | chat falso de tiktok | 2 |
| br | **chat falso messenger online** | **5** |
| br | chat falso de instagram online | 3 |

**优先级结论**：
1. **pt-br > es**。巴西葡语热度显著高于西班牙西语（最高 6 vs 3）
2. 三页版本：**WhatsApp（防守，必须做）+ Messenger（进攻）+ Instagram DM（进攻）**
3. 本地化 slug，不用英文 slug（竞品图省事用英文 slug，我们用本地化词拿本地点击率）

### 3.3 西葡落地页硬性要求

**修饰词 `online` 和 `gratis/grátis` 是西葡最高频后缀**，几乎每个热词都带。标题不能直译英文。

| 市场 | slug | Title 模式 |
|---|---|---|
| es | `/es/generador-chat-whatsapp` | `Generador de Chat de WhatsApp Falso — Gratis y Online` |
| es | `/es/generador-messenger-falso` | `Generador de Chat Falso de Messenger Online Gratis` |
| es | `/es/generador-dm-instagram-falso` | `Generador de DM Falso de Instagram Gratis` |
| pt-br | `/pt-br/gerador-conversa-whatsapp` | `Gerador de Conversa Falsa WhatsApp — Grátis e Online` |
| pt-br | `/pt-br/gerador-chat-messenger-falso` | `Gerador de Chat Falso Messenger Online Grátis` |
| pt-br | `/pt-br/gerador-dm-instagram-falso` | `Gerador de DM Falso Instagram Grátis` |

葡语用 `grátis`（带重音），西语用 `gratis`（无重音）。这个细节错了会明显掉本地信任度。

---

## 第 4 章 AdSense 执行手册

### 4.1 结论先行

**能过审。** `zeoob.com` 当前就挂着 AdSense（源码检出 `adsbygoogle` + `googlesyndication` + `doubleclick` 三处命中）。

Google Publisher Policies 禁止的是 *illegal content* / *misrepresentative content* / *counterfeit goods*——针对能用于真实欺诈的假证件、假政府公文、假银行对账单。聊天截图 mockup 属娱乐与设计素材，**不在禁区**。

**但你真正的敌人是自己：4 次 *low value content* 拒信。**

### 4.2 ⚠️ 红线词：这不是理论，是真实搜索需求

从 1615 个真实搜索词里，检出 **9 个触碰红线**（占 0.56%）：

```
fake text message from lloyds bank        [热度 2]
fake text message from lloyds bank app    [热度 2]
fake bank text messages hsbc              [热度 1]
fake text from bank of america            [热度 1]
fake hospital text message                [热度 1]
fake sick hospital snapchat free          [热度 1]
fake sick hospital snapchat free download [热度 1]
fake court hearing text message           [热度 1]
fake police text message uk               [热度 1]
```

**两个结论**：
1. **红线需求真实存在**——不是我危言耸听，用户确实在搜"伪造银行短信""伪造法庭传票""伪造警方短信"
2. **但占比仅 0.56%**——品类主体健康，不必因噎废食，明确禁止即可

### 4.3 前端黑名单词表（写进校验逻辑）

命中即软提示 + 记录，不做硬阻断（避免过度设计）。分三类：

**A. 金融类（最高危，直接封号）**
```
bank, lloyds, hsbc, barclays, santander, natwest, halifax, chase,
wells fargo, bank of america, citibank, capital one, paypal, venmo,
zelle, cashapp, revolut, monzo, chase, amex, american express,
invoice, receipt, payment received, transfer, refund, overdraft,
loan, mortgage, credit score, insurance claim, tax, irs, hmrc
```

**B. 政府 / 法律类**
```
irs, hmrc, government, dvla, dvsa, uscis, immigration, police,
fbi, court, subpoena, summons, warrant, arrest, fine, penalty,
passport, visa, green card, driver license, driving licence
```

**C. 医疗 / 学历 / 职业资质类**
```
hospital, doctor, prescription, medical, patient, diagnosis,
sick note, vaccine, covid, test result, diploma, degree,
certificate, transcript, license, bar exam
```

西葡等价词必须一并加入：
```
banco, banco de españa, hacienda, policía, juzgado, citación,
multa, pasaporte, visa, seguro, préstamo, factura, recibo,
impuestos, hospital, médico, receta, boleto, cartorio, receita
```

### 4.4 申请前硬性清单（逐条打勾，缺一项不申请）

**内容量**
- [ ] 12 个英文生成器页，每页 **800–1500 词原创**，无跨页复用段落
- [ ] 每页含：how-to（250–400 词）+ 平台 UI 细节拆解（300–500 词）+ 场景（150–250）+ FAQ 6–8 条（300–500）
- [ ] 西葡各 3 页，真实本地化（非机翻）
- [ ] 至少 5 篇 blog（How-to 类 + 1 篇 "Is it legal?" 类）

**信任页（缺一不可）**
- [ ] `/privacy` —— 必须写明"所有内容在浏览器本地处理，不上传服务器"
- [ ] `/terms`
- [ ] `/acceptable-use` —— 含 4.3 的禁止类目清单
- [ ] `/about` —— 真实团队/运营者信息
- [ ] `/contact` —— 真实可触达的联系方式

**每页页脚（12 页全部）**
- [ ] 商标声明：`Not affiliated with, endorsed by, or connected to [平台方]. [平台名] is a trademark of [权利方].`
- [ ] 免责声明：`All generated content is fictional and for entertainment, education, and design mockup purposes only. Do not use to mislead, defraud, harass, or misrepresent.`

**技术**
- [ ] 结构化数据：WebApplication + FAQPage + HowTo + BreadcrumbList
- [ ] sitemap.xml + robots.txt
- [ ] GSC 已验证，索引率 ≥ 80%
- [ ] 移动端友好、核心指标达标（LCP < 2.5s）
- [ ] 无侵入式插页广告、无诱导点击

**站点年龄**
- [ ] 上线满 3 个月（Google 对新站的 *low value* 审查更严）
- [ ] 已有稳定自然流量（建议 ≥ 1000 PV/月再申请）

### 4.5 广告位策略

**原则：工具区上方绝不放广告。**

```
┌─────────────────────────────────┐
│  Header / Nav                   │
├──────────┬──────────────────────┤
│ 配置面板 │  ← 广告位 1（侧栏）  │
│          │   实时预览           │
│          │  ← 广告位 2（预览下方）│
├──────────┴──────────────────────┤
│  工具说明 / How-to              │
│  ← 广告位 3（内容中，第 2 个 H2 后）│
├─────────────────────────────────┤
│  FAQ                            │
│  ← 广告位 4（页脚上方）          │
└─────────────────────────────────┘
```

- 桌面最多 3 个展示位，移动最多 2 个
- **不使用**自动插页广告（Anchor / Vignette）——工具类页面会被判为干扰导航
- 首屏不放广告（影响 LCP 与体验，也影响 *low value* 判定）

### 4.6 收益预期（诚实版）

按实测热度分配流量份额，假设月 3 万 PV（新域名 12 页 × 3 语言的 6 个月现实预期）：

| 页面 | 热度占比 | 预估 PV/月 | 说明 |
|---|---|---|---|
| WhatsApp | 32.6% | ~9,800 | 广告主战场 |
| Text/SMS | 21.7% | ~6,500 | |
| iPhone/iMessage | 16.2% | ~4,900 | |
| 群聊 | 6.4% | ~1,900 | |
| Messenger | 4.7% | ~1,400 | |
| 其余 7 页 | 18.4% | ~5,500 | |

**RPM 估算**：英文 $2–4，西葡 $1–2，综合取 $2

> **月 3 万 PV × $2 / 1000 ≈ $60/月**
> **月 10 万 PV ≈ $200/月**

**我的反对意见（再说一次）**：这个收益水平养不了站。如果目标是为 Kling3AI 导流，单次 $9.9 订阅转化 ≈ 3000 次广告点击，**导流价值远高于 AdSense**。建议上线前定死这个取舍——它决定页面要不要留导流位、要不要放广告。

### 4.7 申请流程与时间安排

| 时间 | 动作 |
|---|---|
| M0 | 上线，P0 三页 |
| M0–M1 | 补齐 12 页 + 西葡 6 页 + 信任页 |
| M1–M3 | 内容扩充至 blog 5 篇+，跑 GSC 索引 |
| **M3** | **首次申请 AdSense**（此时约 20+ 页实质内容） |
| M3–M4 | 若被拒 → 按拒信原因补内容，30 天后重申 |
| M4+ | 过审后按 4.5 布广告位，观察 2 周再决定是否加密度 |

**被拒后的处理**：不要立刻重申。*low value content* 拒信说明内容量或深度不够，需实质性补充（不是微调措辞），30 天后再申。

---

## 第 5 章 内容规格（对抗 low value content）

这是过审的唯一硬门槛，不能省。

### 5.1 每页结构模板

```markdown
# H1: Fake [平台] [Chat/Message] Generator
首段 80-120 词：这是什么、给谁用、免费无注册无水印、本地处理

[工具本体 — 编辑器]

## How to make a fake [平台] conversation        (250-400 词)
   4-6 步，每步含真实细节（不是"点击按钮"这种废话）

## [平台] UI details that make it look real      (300-500 词)
   ★ 这是核心区块，见 5.2

## When people use fake [平台] screenshots       (150-250 词)
   3-5 个具体场景

## FAQ                                          (300-500 词)
   6-8 条，平台特有，含疑问句长尾

[免责声明 + 商标声明]
```

### 5.2 "平台 UI 细节拆解"区块写法（差异化核心）

这是全套内容里**最重要的一块**：天然独特（12 个平台参数互不相同）、对真实用户有信息价值、无法被 AI 批量套模板。

每个平台必须写：

| 要素 | 示例（WhatsApp） |
|---|---|
| 气泡色值 | 外发 `#d9fdd3` / 收件 `#ffffff`（深色模式 `#005c4b` / `#202c33`） |
| 气泡圆角与尾巴 | 圆角 8px，首条消息带小尾巴 |
| 字体与字号 | Helvetica/系统字体，正文 15px，时间戳 11px |
| 回执语义 | 单灰勾=已发送，双灰勾=已送达，双蓝勾=已读 |
| 状态栏特征 | 时间位置、电量图标、信号格数 |
| Header 结构 | 头像 + 名称 + 在线状态/最后上线 |
| 明暗模式差异 | 背景 `#efeae2` ↔ `#0b141a` |

**这部分要求真机核对**，不能凭记忆写——写错了既害用户又毁信任度。

---

## 第 6 章 监控与迭代

### 6.1 数据回填（补齐 Autocomplete 缺的绝对搜索量）

Autocomplete 只给相对热度。上线后用 GSC 回填真实数据：

| 周 | 动作 |
|---|---|
| W+2 | GSC 提交 sitemap，记录索引率 |
| W+4 | 导出"查询"报告，看实际命中词与展现量 |
| W+8 | 用真实展现量校准第 1 章的热度排序 |
| M3 | 用真实 CTR 判断 Title / Meta Desc 是否需要重写 |

### 6.2 关键词迭代机制

种子词由我设计，可能遗漏角度。补充采集入口：
1. **GSC 查询报告** —— 真实命中词，最有价值
2. **页面内搜索/反馈** —— 用户找不到某平台时的输入
3. **竞品新增页面** —— 定期抓 thefake.design / chatfalso / heyfake 的 sitemap diff

采集脚本已落地：`scripts/keyword_research.py`（采集）+ `scripts/analyze_keywords.py`（分析），改种子词即可重跑。

**触发式迭代规则（GSC 数据 → 动作对照，2026-09-10 定稿）**

背景数据：fake 系词占大盘热度 79%，mockup 系仅 2%；首页 H1 "Free chat mockup generator" 是品牌防守位（域名对齐 + AdSense 安全），不改动。fake 意图的三层承接已闭环：URL（fake-text-message-generator）→ 博客 how-to 文 → 生成器页 H2/FAQ（commit bcdf438：WhatsApp 页 "What a fake WhatsApp chat generator is — and what it isn't" + iPhone 短信页 "Fake text messages, done responsibly" + 两页 fake FAQ，JSON-LD 自动同步）。

| GSC 触发条件（上线后观察） | 动作 | 优先级 |
|---|---|---|
| WhatsApp 页有 fake 系曝光但排名 20-50 不动 | 正文再织 fake 系同义词（H3 级小节），**不动 title/H1** | 第一刀 |
| fake 系曝光有、CTR < 3% | 重写 meta description（加入 free/no signup 转化词） | 第二刀 |
| 排名进前 20 但 CTR 仍低 | 此时才考虑 title 加 "fake"（品牌取舍让位于流量） | 最后手段 |
| 其余 8 页某页出现 fake/平台系曝光 | 给该页补同款 H2 + FAQ（照 bcdf438 模式） | 按曝光定向 |
| 某平台生成器页曝光/转化明显起量 | 补该平台博客 how-to 指南（剩 5 篇存量） | 按数据定，不预铺 |
| 索引率 < 80%（W+4） | 查内链覆盖 + sitemap，不急着加内容 | 基线 |

红线不变：任何内容扩充必须单页定制、不碰 how-to 句式与博客蚕食、不做多语言/多模板批量生成（见 8.3 scaled content）。

### 6.3 验收指标

| 指标 | 目标 | 观测 |
|---|---|---|
| 索引率 | 30 天内 ≥ 80% | GSC |
| 主词排名 | 3 个月内进前 50 | GSC |
| 访问→导出转化 | ≥ 15% | GA4 |
| 平均停留 | ≥ 90 秒 | GA4 |
| 跳出率 | ≤ 65% | GA4 |
| AdSense 申请 | M3 提交 | — |

---

## 附：文件索引

```
scripts/keyword_research.py      关键词采集（Google Autocomplete，支持 gl/hl 地区化）
scripts/analyze_keywords.py      关键词分析（平台热度 / 意图热度 / Top 词 / 红线检查）
scripts/output/keywords_raw.json      2260 条原始记录
scripts/output/keywords_report.csv    1615 个去重词（含热度 / 最佳位次 / 市场）
```
