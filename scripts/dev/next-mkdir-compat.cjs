/**
 * 本地开发环境兼容补丁（只用于 `next dev` / `next build`）
 *
 * ── 它解决什么 ────────────────────────────────────────────────────────────
 * 本机（WorkBuddy harness）的 brokered-fs shim 有一个缺陷：
 *   对**已存在**的目录调用**非递归** `mkdir` 时，宿主返回的正常 `EEXIST`
 *   被包装成了 `CODEBUDDY_BROKER_DENY`（decision: 'host-op'）。
 *   带 `{recursive:true}` 时行为正常。
 *
 * 实测（最短复现）：
 *   node -e "fs.mkdirSync('x')"                  // x 不存在 → OK
 *   node -e "fs.mkdirSync('x')"                  // x 已存在 → CODEBUDDY_BROKER_DENY（应为 EEXIST）
 *   node -e "fs.mkdirSync('x',{recursive:true})" // x 已存在 → OK
 *
 * Next.js 启动流程会对 `.next` 做非递归 mkdir，于是第二次起就变成致命错误：
 * 所有路由 500，日志里是成片的
 *   Error: EEXIST: file already exists, mkdir '/…/.next'
 *   code: 'CODEBUDDY_BROKER_DENY'
 * 同时 webpack 缓存目录报 ENOENT。
 *
 * ── 它不做什么 ────────────────────────────────────────────────────────────
 * 不卸载、不绕过任何安全机制：safe-delete 守卫、语言 shim、路径权限全部原样保留。
 * 它只把 `mkdir` 变成**幂等**（等价于 recursive 语义），让"目录已存在"回到
 * 正常的成功返回。除此之外不改变任何 fs 行为。
 *
 * ── 用法 ──────────────────────────────────────────────────────────────────
 *   NODE_OPTIONS="$NODE_OPTIONS --require ./scripts/dev/next-mkdir-compat.cjs" npm run dev
 *
 * ⚠️ `--require` 只认**绝对路径或以 `./` 开头**的路径；写成
 *    `scripts/dev/next-mkdir-compat.cjs`（无 `./`）会 MODULE_NOT_FOUND。
 *
 * 注意：**不要**为了跑通构建去 `unset NODE_OPTIONS` —— 那是环境的安全机制。
 */

const fs = require("fs");

function normalize(opts) {
  if (opts === undefined || opts === null) return { recursive: true };
  if (typeof opts === "number") return { mode: opts, recursive: true };
  if (typeof opts === "string") return { mode: opts, recursive: true };
  if (typeof opts === "object") {
    return opts.recursive ? opts : { ...opts, recursive: true };
  }
  return { recursive: true };
}

const origMkdirSync = fs.mkdirSync;
fs.mkdirSync = function patchedMkdirSync(p, opts) {
  return origMkdirSync.call(fs, p, normalize(opts));
};

if (fs.promises && typeof fs.promises.mkdir === "function") {
  const origMkdir = fs.promises.mkdir;
  fs.promises.mkdir = function patchedMkdir(p, opts) {
    return origMkdir.call(fs.promises, p, normalize(opts));
  };
}

if (process.env.CM_MKDIR_PATCH_DEBUG) {
  console.error("[mkdir-compat] loaded");
}
