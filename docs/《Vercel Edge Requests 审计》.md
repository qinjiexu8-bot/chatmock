# Vercel Edge Requests 审计报告

日期：2026-09-24 · 站点：chatmock.net（Next.js 静态预渲染 + Vercel）
结论：**不是泄漏，是结构性放大**；主要成因是 `next/link` 的 RSC 预取，占单页请求约 80%。

---

## 0. 口径前提

Vercel 的 Edge Requests 统计 **cached + uncached 都计数**——CDN 命中（`x-vercel-cache: HIT`）
照样算一次。所以"用户没点的资源"（预取、字体、chunk）全部计入。

换算公式：`月请求数 ÷ 单页请求数 ≈ 月页面浏览数`。单页请求数实测见第 2 节（热缓存 15~25，冷访 41）。

## 1. 先排掉几个常见放大源（本项目全部不成立）

| 检查项 | 结果 |
|---|---|
| 静态资源缓存头 | ✅ `/_next/static/*` 已是 `public, max-age=31536000, immutable`（Next.js 自带，与 Astro 站的平台默认值陷阱不同） |
| `next/image` 优化请求 | ✅ 未使用（全站零位图，图标都是内联 SVG） |
| middleware（每请求必跑） | ✅ 无 |
| OG 图动态渲染 | ✅ `app/og/[...slug]` 是 `dynamic = "force-static"`，构建期出图 |
| API 路由 / 轮询 | ✅ 无 |
| 仓库里有没有人设过 cache-control | ✅ 无（所以非哈希资源的头是平台默认） |

**唯一确认的浪费**：`app/` 文件约定生成的图标没有内容哈希，拿到的是平台默认头
`public, max-age=0, must-revalidate` → **每次导航都回源重新验证**：

```
/icon.svg          cache-control: public, max-age=0, must-revalidate
/favicon.ico      同上
/apple-icon.png   同上
```

实测每一次页面浏览都至少为 `/icon.svg` 多花 1 条请求。

## 2. 单页请求构成（线上真实测量）

> ⚠️ **口径已在 2026-09-29 修正**，本节数字是修正后重测的。修正内容见下。
> 复现命令：`BASE=https://chatmock.net node scripts/qa/edge-requests.cjs`

### 判据：必须用 Resource Timing 的 `transferSize > 0`

踩过两个坑，都写进脚本头注释了：

| 判据 | 结论 |
|---|---|
| `page.on("request")` / CDP `requestWillBeSent` | ❌ 对**缓存命中**同样派发，会把 immutable 的 `/_next/static/*` 缓存命中算进来，总数虚高 |
| CDP `response.fromDiskCache` | ❌ 近年 Chromium 上不可靠——实测复访时 immutable 的 css/font/js 仍报 `false`，判据全假 |
| **Resource Timing `transferSize > 0`** | ✅ 采用。304 条件请求也计入（它真走了边缘，只是转移体小） |

脚本因此两条腿走路：CDP 事件**枚举 + 分类**，Resource Timing **判定是否真走网络**。

### 修正后的构成（2026-09-29 部署前基线）

| 页面 | 冷缓存首访 | 同会话复访 | 其中 RSC 预取 | 复访里被缓存省掉的 |
|---|---|---|---|---|
| 首页 | 39 | 14 | 11 | js 21→0、css 1→0、font 3→0 |
| 生成器页 | 40 | 14 | 11 | js 21→0、css 1→0、font 3→0 |

## 3. 预取为什么是复访的主要成因

`next/link` 在链接进入视口时抓取完整 RSC 载荷，每个站内唯一链接 = 1 次请求。
预取载荷的响应头是：

```
cache-control: public, max-age=0, must-revalidate
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
```

`must-revalidate` ⇒ **每次新开页面都把所有视口内链接重新问一遍**（客户端 router cache
只在同一次会话 5 分钟内复用）。所以：

- JS / CSS / 字体首访后被 `immutable` 永久缓存，复访**归零**
- 唯独预取**一条都省不掉**：复访 14 条里 11 条是预取（**79%**）

**这才是热缓存复访请求降不下来的唯一原因。**

### 一个被推翻的判断（留作教训）

原方案写的是"关 footer 低意图链接、净减 2 条"。**实测收益为 0**：footer 位于页面底部，
不进初始视口，IntersectionObserver 根本不触发——它本来就没被预取。
真正的来源是**视口内的链接**：`SiteHeader` 的 6 条主导航 + 生成器页顶部的 Switch 切换条
+ 首页的生成器卡片网格。**判断预取点时，一切以实测的预取 URL 列表为准，不要凭"链接在页面上"推断。**

## 4. 已实施：A + B（2026-09-29，commit 745a400）

| 档 | 做法 | 说明 |
|---|---|---|
| **A** | 新增 `vercel.json` 给无哈希静态资源补缓存头 | `/favicon.ico` 用 `max-age=604800, stale-while-revalidate=86400`（HTML 里是**无哈希**引用，留改名逃生口）；`/icon.svg`、`/apple-icon.png` 由 Next 生成**内容哈希** URL（实测两者哈希不同，确认是内容哈希）⇒ `max-age=31536000, immutable`；顺带给 `/robots.txt`、`/ads.txt`（1 天）、`/sitemap.xml`（1 小时）补短缓存，消掉爬虫回源 |
| **B** | `prefetch={false}` 加在**实测确认的两处**：`GeneratorShell` 的 Switch 切换条、首页的生成器卡片网格 | 关掉的只是"进视口即预取" |

### `prefetch={false}` 的确切语义（读 next@15.5.25 `dist/client/link.js` 源码确认）

```js
// 视口预取：会被 prefetch={false} 关掉
if (!isVisible || !prefetchEnabled) return;

// hover 预取：onMouseEnter 里无条件调用，**不看 prefetchEnabled**
prefetch(router, href, as, { locale, priority: true, bypassPrefetchedCheck: true });

// touchstart 预取：同样无条件，移动端点击前仍预加载
```

⇒ 关掉的只是"无人问津时也预取"，**hover / 点击前仍有预加载，点击体感不变**。
这也是本方案敢下手的依据；原方案里"D 档每次点击多 100~300ms"的判断**过重，已作废**。

### 实测收益（同口径、同环境，线上前后对比）

| 页面 | 冷缓存首访 | 同会话复访 | RSC 预取 |
|---|---|---|---|
| 首页 | 39 → **29**（-26%） | 14 → **8**（-43%） | 11 → 6 |
| 生成器页 | 40 → **30**（-25%） | 14 → **8**（-43%） | 11 → 6 |
| **合计（两页）** | 79 → **59（-25%）** | 28 → **16（-43%）** | 22 → 12 |

**一个额外收获**：冷缓存少的 10 条里有 5 条不是预取本身，而是**路由 JS chunk**——
预取被关后，客户端不再为那些路由预加载对应的 chunk（js 21→16）。
所以"关预取"的收益比预取条数本身更大。

### 线上验证（2026-09-29）

```
/favicon.ico       public, max-age=604800, stale-while-revalidate=86400
/icon.svg          public, max-age=31536000, immutable
/apple-icon.png    public, max-age=31536000, immutable
/robots.txt        public, max-age=86400
/ads.txt           public, max-age=86400
/sitemap.xml       public, max-age=3600
```

回归：`tools.cjs` 74/74、`site_audit` console 干净、`adsense.cjs` 9/9、`analytics.cjs` 8/8。

## 4.1 剩余空间：还要不要关 header 主导航（待拍板）

关掉后，每页预取会从 6 条 → 0~1 条，复访有望再降约 **40~50%**（即 8 → 4~5 条）。
代价：键盘 Tab+Enter、右键新标签、中键点击这三条路径失去预取
（hover 与 touchstart 仍会预取，鼠标/触屏用户的体感不变）。

尚未做，等拍板。

## 4.2 考虑过但否决的做法

**给 `?_rsc=` 响应加长缓存**：预取载荷是 `max-age=0, must-revalidate`，若能改成
`immutable` 就等于预取全部走浏览器缓存，收益比关预取更大且零 UX 代价。
**否决原因**：RSC 载荷必须与页面端当前构建的 JS 严格一致，一旦 `_rsc` 参数值跨部署
不变化，就会把上一次构建的载荷喂给新版客户端，导致导航错乱。收益不足以承担这个风险。

## 5. 另一个不能忽略的来源：爬虫

`robots.txt` 目前是 `user-agent: * / allow: /`，AI 爬虫（GPTBot / ClaudeBot 等）与
SEO 爬虫（Ahrefs / Semrush）会实打实消耗请求，且它们不跑 JS、不触发预取（每 URL 约 1~5 条）。

- 轻量做法：`robots.txt` 里按需 disallow 明确的 AI 爬虫（合规爬虫会遵守）
- 平台侧做法：Vercel WAF 自定义规则——**必须配持久化动作**（challenge/deny + block
  timeframe），否则被挡的请求照常计入

## 6. 待补信息（决定"是否异常"）

- Vercel 后台的实际数字与统计区间
- 套餐（Hobby 为 1M / 30 天滚动窗口，且没有账单周期）
- 若数字与"PV × 15~25"对得上 ⇒ 正常；若明显偏高 ⇒ 先查爬虫与 404 探测流量
  （建议开 Log Drains 或看 Observability 的 Top paths）

## 7. 追加项：Vercel Web Analytics（2026-09-25 接入）的请求成本

接入方式见 `components/VercelAnalytics.tsx`：`@vercel/analytics@2` 的 `<Analytics />`
挂在 root layout，脚本由 **客户端 useEffect 动态注入**（`document.createElement`），
因此：

- **预渲染 HTML 里完全没有 analytics 痕迹** ⇒ 首屏与静态导出的请求数零变化
- 每 PV 净增 **1 条**边缘请求：POST `/<hash>/view`（view 信标）
- collector 脚本本身：`GET /<hash>/script.js`，响应头 `cache-control: public,
  max-age=2678400`（31 天），**只有全新会话才拉一次**；SPA 内点击导航不重复拉
- 换算：接入后 PV ≈ 请求数 ÷ 16~26，analytics 约占总量 **5~7%**
  —— 属于"换真实 PV 数据"的必要开销；要压请求数优先动预取，不要动这里。

### 线上实测（2026-09-25，chatmock.net 已部署）

| 观测项 | 结果 |
|---|---|
| 注入脚本路径 | `/800fee2565e07c22/script.js`（**不是** `/_vercel/insights/script.js`） |
| 上报端点 | `/800fee2565e07c22/{view,event,session}` |
| 脚本响应 | 200，`defer`，`max-age=2678400` |
| 首屏 pageview | POST `/800fee2565e07c22/view` → 200 |
| SPA 内点击导航 | 再发一次 `/view` → 200（路由切换也计数） |
| 预渲染 HTML | 无任何 analytics 痕迹 |

> 路径与端点由平台在构建期下发的 `NEXT_PUBLIC_VERCEL_OBSERVABILITY_*` 决定
> （SDK 默认值才是 `/_vercel/insights/*`）。**不要把这些路径写死进代码或 QA 断言**，
> 一律读注入标签的 `dataset`（`viewEndpoint` / `eventEndpoint` / `sessionEndpoint`）。

> ⚠️ **验收陷阱**：collector 脚本（observability v0.1.3）开头就是
> `if (navigator.webdriver || UA.includes("Headless")) return;` —— 无头/自动化浏览器被官方
> 主动排除。用 headless Playwright 直接量会得到"脚本 200 但不执行、零信标"的**假阴性**。
> 正确做法：`--disable-blink-features=AutomationControlled` + 覆盖掉 UA 里的 `Headless`，
> 已固化进 `scripts/qa/analytics.cjs`（`BASE=https://chatmock.net` 可对线上跑）。

> 注：Hobby 套餐 Web Analytics 有月度事件额度，超限会**暂停数据摄取**（后台可能出现
> "Limit reached / Data ingestion is paused" 类横幅）。这只影响数据入库，
> 不影响站点本身；端点仍返回 200，暂停期结束后数据是否补齐由平台决定（不保证回填）。

### 额度机制与"后台还是 Get Started"的判定（2026-09-25 核实）

官方口径（vercel.com/docs/analytics/limits-and-pricing + /docs/plans/hobby）：

| 事实 | 内容 |
|---|---|
| Hobby 额度 | **50,000 events / 月**，且**同一账号下所有项目共享**（不是按项目各算） |
| 什么算 event | 一次自动 pageview 或一次自定义事件；Speed Insights 的 Web Vitals 另计 |
| 超限行为 | 先有 **3 天宽限期**，之后**停止收集** |
| 恢复方式 | Hobby **不能加购事件**；需等（官方口径 7 天后恢复收集）或升级 Pro（按 $0.03/1K 事件计费） |
| 判定链 | 后台显示 "Get Started" + "0 online" + 横幅 paused ⇒ **额度/摄取问题，不是接线问题** |

**如何区分"没接上"与"被暂停"（两条硬证据）**：

```bash
# 1) 信标有没有发出、平台有没有收 —— 期望 200 + body=OK
BASE=https://chatmock.net node scripts/qa/analytics.cjs
#    输出 beacon accepted: POST 200 body=OK /<hash>/view  ⇒ 接线正常
# 2) 账号侧额度：Vercel → Settings → Usage → Observability，看 Events 用量与是哪个项目在烧
```

结论口径：**信标 200+OK 但后台零数据 ⇒ 锅在账号额度，不在代码。** 此时不要改代码，
要么等恢复，要么换一个不受该额度约束的统计口径（GA4 免费无事件额度）。

