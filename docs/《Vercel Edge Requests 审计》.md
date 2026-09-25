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

## 2. 单页请求构成（线上真实测量，Playwright + Resource Timing）

判据用 `transferSize > 0`（真走网络），不能用 `page.on("response")`——它对缓存命中同样派发。

| 页面 | 冷缓存首访 | 热缓存复访（真走网络） | 其中 RSC 预取 | 其余 |
|---|---|---|---|---|
| 首页 | 41 | 12 | 11 | document + `/icon.svg` |
| 生成器页 | — | 18（移动 16） | 14（移动 9） | `/icon.svg` + 路由 chunk |
| /examples | — | 25（移动 14） | 20（移动 10） | `/icon.svg` + 4 个路由 chunk |
| 博客文 | — | 17（移动 15） | 12（移动 9） | `/icon.svg` + 路由 chunk |

首页冷访 41 条构成：`JS 22 + 字体 3 + CSS 1 + document 1 + 预取 14`。
JS/CSS/字体首访之后永久缓存（immutable），**热缓存下几乎不再产生请求**。

### 预取为什么是主要成因

`next/link` 在链接进入视口时抓取完整 RSC 载荷，每个站内链接 = 1 次请求。
预取载荷的响应头是：

```
cache-control: public, max-age=0, must-revalidate
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
```

`must-revalidate` ⇒ **每次新开页面都把所有视口内链接重新问一遍**（客户端 router cache
只在同一次会话 5 分钟内复用）。所以热缓存下每条预取仍是实打实的 1 次边缘请求。

首页滚动前 36 条 → 滚动后 42 条：多出的 6 条就是滚入视口才触发的预取。

## 3. 关预取的净收益（必须按 URL 去重算）

`<Link>` 的个数 ≠ 预取请求数，Next 按 href 去重。四个代表页的 footer 链接集都是
`{/, /about, /acceptable-use, /blog, /examples, /privacy}`，其中只有 **`/about`、`/privacy`**
不被页面其它区域覆盖——**关掉 footer 预取每页只净减 2 条**（不是 6 条）。

各页站内唯一链接数：首页 22、生成器页 24、/examples 32、博客文 18。

## 4. 可选方案（按收益/代价排序，待拍板后实施）

| 方案 | 每 PV 减少 | 代价 | 备注 |
|---|---|---|---|
| **A. 给图标加缓存头**（`vercel.json`，`/icon.svg`、`/favicon.ico`、`/apple-icon.png` 用 `public, max-age=604800`） | 1~3 | 无 | 这三个无内容哈希，**不能**用 `immutable` |
| **B. 关低意图链接预取**（footer 的 `/about`、`/privacy`，以及 /examples 的交叉链接） | 2~4（约 15%） | 无感 | 高意图的主导航与生成器卡片保留 |
| **C. 再关次级交叉链接**（生成器页"其他平台"、博客页相关阅读） | 累计 6~10（约 40%） | 点击后多等一跳 | 平台切换在本站算中等意图，需权衡 |
| **D. 全站 `prefetch={false}`** | 约 80% | 每次点击多 100~300ms | 静态站首屏很快，但导航即时性明显变差 |

推荐组合：**A + B**（零 UX 代价）；若额度仍紧张再考虑 C。

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

> 注：Hobby 套餐 Web Analytics 有月度事件额度，超限会**暂停数据摄取**（后台横幅
> "Limit reached / Data ingestion is paused until …"）。这只影响数据入库，不影响站点本身。

