"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics 接线（在 Vercel 后台 Project → Analytics 开启后生效）。
 *
 * - 仅在 Vercel 生产环境真正上报：SDK 默认 mode="auto"，
 *   本地 `next dev` / 非 Vercel 环境自动静默（脚本 URL 返回 404，不阻塞页面）。
 * - 不经过第三方域名、无 cookie，不采集个人数据（Vercel 官方口径，
 *   已在 /privacy 里如实声明）。
 * - 与 GA4 并存：GA4 负责事件级转化（export_png），Analytics 负责
 *   真实 PV / 访客数 / 来源与设备——两套数据口径不同，互不替代。
 *
 * 成本提示（与《Vercel Edge Requests 审计》一致）：
 * 每个 PV 会额外产生 ~2 条 edge request（script.js 拉取 + view 事件上报），
 * 属于换取真实 PV 数据的必要开销；如后续要压请求数，先看这里的占比。
 */
export function VercelAnalytics() {
  return <Analytics />;
}
