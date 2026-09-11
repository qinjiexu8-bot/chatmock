# 上线提交清单：GSC / 站点地图 / 其他索引渠道

> 站点：https://chatmock.net ｜ 部署：Vercel ｜ DNS：Cloudflare
> 清单生成：2026-09-11（线上体检通过后）

---

## 0. 线上体检结论（2026-09-11 09:5x 实测）

| 检查项 | 结果 |
|---|---|
| 34 条路由 HTTP 状态 | 全部 200 |
| title / description 重复 | 无 |
| 浏览器 console 报错 | 无 |
| 真实导出 PNG（生产环境点击下载） | 通过，780×1560 @2x，123KB，文件名正常 |
| Lighthouse 首页（生产） | 性能 **98** / 无障碍 **100** / 最佳实践 **100** / SEO **100** |
| Lighthouse 生成器页（生产） | 性能 **97** / SEO **100**（无障碍 87 见下方说明） |
| 核心指标 | LCP 2.0s ｜ TBT 80ms ｜ CLS 0 |
| www → 主域 | 307 规范化 ✅ |
| http → https | 308 ✅ |
| HSTS | `max-age=63072000` ✅ |
| SSL 证书 | CN=chatmock.net，2026-09-11 → 2026-12-10（Vercel 自动续期） |
| Vercel 缓存 | `x-vercel-cache: HIT`、`x-nextjs-prerender: 1`（静态预渲染生效） |
| OG 图 / favicon / apple-icon | 抽查全部 200，image/png |
| sitemap.xml | 200，34 条 URL，Host 声明正确 |

**无障碍 87 说明**：生成器页剩余 4 处对比度失败全部位于手机预览内部，是 WhatsApp 官方原机配色（`#667781` 说明文字灰、`#8696a0` 时间戳灰）。这是产品拟真核心要求，**刻意保留**，不是缺陷。

**唯一待补项**：生产 HTML 中 `googletagmanager` 引用数为 0 —— GA4 尚未接线，见第 4 节。

---

## 1. Google Search Console（必做）

### 1.1 创建属性 —— 选「网域（Domain）」

入口：https://search.google.com/search-console → 添加属性 → 左侧选「网域」→ 填 `chatmock.net`

**为什么选网域而不是网址前缀**：
- 一次验证覆盖 http/https、www/非 www、所有子域
- 验证记录在 DNS 里，不因站点改版或文件变动失效
- 网址前缀方式需要下载 HTML 验证文件放进 `public/` 并重新部署，或改 `layout.tsx` 加 meta 标签——都更麻烦

**DNS 验证记录（在 Cloudflare 加）**：

| 字段 | 值 |
|---|---|
| 类型 | `TXT` |
| 名称 | `@`（即 chatmock.net） |
| 内容 | `google-site-verification=XXXXXXXXXXXX`（GSC 页面会生成，复制过来） |
| TTL | Auto |

路径：Cloudflare Dashboard → 选中 chatmock.net → DNS → Records → Add record

> ⚠️ 加完**不要删**这条 TXT 记录，删掉验证会失效。

添加后回 GSC 点「验证」，通常几秒到几分钟生效（Cloudflare 解析快）。

### 1.2 提交站点地图

GSC 左侧 → **索引 → 站点地图** → 「添加新的站点地图」→ 填：

```
sitemap.xml
```

（左侧会自动补全为 `https://chatmock.net/sitemap.xml`）

预期结果：状态显示「成功」，已发现 34 个网页。

> robots.txt 里已有 `Sitemap:` 声明，但 GSC 里仍建议显式提交一次——这样能拿到「已读取 vs 已编入索引」的对比数据，是排障关键。

### 1.3 手动请求编入索引（优先推送赚钱页）

GSC 顶部搜索框 → 粘贴 URL → 「测试实际网址」→ 「请求编入索引」

按优先级推送（**每天每个属性额度约 10 次，别一次推完**）：

**第一批（今天）**
1. https://chatmock.net/
2. https://chatmock.net/whatsapp-chat-generator
3. https://chatmock.net/fake-text-message-generator
4. https://chatmock.net/instagram-dm-generator
5. https://chatmock.net/messenger-chat-generator
6. https://chatmock.net/snapchat-chat-generator
7. https://chatmock.net/telegram-chat-generator
8. https://chatmock.net/discord-chat-generator
9. https://chatmock.net/group-chat-generator
10. https://chatmock.net/whatsapp-call-generator

**第二批（明天）**
11. https://chatmock.net/android-sms-generator
12. https://chatmock.net/blog
13. https://chatmock.net/blog/how-to-make-a-fake-whatsapp-chat
14. https://chatmock.net/blog/fake-text-message-on-iphone-and-android
15. https://chatmock.net/blog/instagram-dm-screenshot-guide
16. https://chatmock.net/blog/discord-message-mockup-guide
17. https://chatmock.net/blog/telegram-chat-screenshot-guide
18. https://chatmock.net/blog/chat-screenshots-in-video-storytelling
19. https://chatmock.net/blog/messaging-app-ui-colour-reference
20. https://chatmock.net/examples

---

## 2. 其他索引渠道（按性价比排序）

### 2.1 Bing 网站管理员工具 —— 强烈建议做

https://www.bing.com/webmasters

- 注册后选 **「Import from Google Search Console」** —— 一键导入属性和站点地图，不用重新验证
- 站点地图填：`https://chatmock.net/sitemap.xml`

**为什么值得**：Bing 的索引同时供给 Copilot、ChatGPT 搜索、DuckDuckGo、Ecosia。对工具站来说 AI 搜索入口的流量正在变重要，成本却只有点两下。

### 2.2 IndexNow —— 推荐（一次性推送全部 URL）

被 Bing / Yandex / Naver / Seznam / Yep 支持，主动推送比被动等爬虫快得多。

做法：在站点根目录放一个 `<key>.txt` 密钥文件，然后 POST 一次 34 个 URL 的清单。
**代价**：需要一次部署把密钥文件放上去（密钥文件内容就是 key 本身）。

需要的话我可以生成 key + 推送脚本，你合并后部署即可。

### 2.3 可选 / 不建议

| 渠道 | 建议 | 理由 |
|---|---|---|
| Yandex Webmaster | 可选 | 俄语区流量，工具站收益低，顺手可加 |
| 百度站长平台 | 不建议 | 站点为英文工具站，Google/Bing 是主战场，且国内访问 Vercel 不稳定 |
| 各类目录站/外链平台 | 做 | 走已有的 100+ 平台推广清单（独立于本清单） |

---

## 3. 提交后的观察节奏

| 时间点 | 看什么 | 正常表现 |
|---|---|---|
| T+0 | sitemap 状态 | 「成功」、已发现 34 |
| T+1~3 | `site:chatmock.net` 抽查 + GSC 概览 | 开始有少量数据 |
| T+7 | GSC → 索引 → 网页 | 首页 + 主力生成器页「已编入索引」 |
| T+14~28 | 效果报告：曝光 / 点击 / 平均排名 | 按《关键词策略与AdSense执行手册》第 6 章决策表开第一轮迭代 |

**排障信号**：
- 「已发现 – 目前未编入索引」多 → 抓取预算或内链权重不足，加内链、等
- 「已抓取 – 目前未编入索引」多 → 内容质量信号问题（AdSense 的 low value content 是同一个病根）
- sitemap 显示「无法读取」 → 检查 robots.txt 和返回头

---

## 4. 现在还欠的两个动作

1. **GA4 接线**（流量数据从 0 开始积累，晚一天丢一天数据）
   - analytics.google.com 建 GA4 属性 → 数据流 → 拿 `G-XXXXXXX`
   - Vercel 项目 → Settings → Environment Variables → `NEXT_PUBLIC_GA_ID=G-XXXXXXX`
   - Redeploy 一次即生效（已验证：填了才渲染 gtag，未填零副作用）
   - 导出转化事件 `export_png` 已埋好，接线后自动开始回传

2. **外链与初始曝光**：走已有的 ProductHunt 等 100+ 平台清单，与搜索引擎收录是两条独立线

---

## 附：34 个 URL 完整清单

已导出到 `scripts/output/submit-urls.txt`（IndexNow 批量推送 / 手动核对用）。
