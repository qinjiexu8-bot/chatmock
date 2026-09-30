// lib/persistence.ts 的纯函数单测（不进浏览器）。
//
// 为什么要有这一份：草稿归一化与配额降级是**数据安全**逻辑，出错的后果是
// "用户对话没了"，但在无头浏览器里几乎无法真实触发（配额是浏览器内部阈值，
// 塞不满也测不准）。所以把 TS 就地编译成 CommonJS，配一个可控的
// mock localStorage，直接断言行为。
//
// 用法: node scripts/qa/draft-unit.cjs
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "../..");
const OUT = "/tmp/chatmock-persist-unit";

const results = [];
function report(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`[${pass ? "PASS" : "FAIL"}] ${name} — ${detail}`);
}

// ---------------------------------------------------------------- 编译
fs.rmSync(OUT, { recursive: true, force: true });
execFileSync(
  path.join(ROOT, "node_modules/.bin/tsc"),
  [
    "lib/types.ts",
    "lib/persistence.ts",
    "--outDir",
    OUT,
    "--module",
    "commonjs",
    "--target",
    "es2020",
    "--moduleResolution",
    "node",
    "--skipLibCheck",
    "--strict",
  ],
  { cwd: ROOT, stdio: "inherit" }
);

// ---------------------------------------------------------------- mock localStorage
const store = new Map();
let quota = Infinity; // 单条 value 的字符上限
global.window = {
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => {
      if (String(v).length > quota) {
        const err = new Error("QuotaExceededError");
        err.name = "QuotaExceededError";
        throw err;
      }
      store.set(k, String(v));
    },
    removeItem: (k) => store.delete(k),
  },
};

const P = require(path.join(OUT, "persistence.js"));
const T = require(path.join(OUT, "types.js"));

const valid = () => {
  const c = T.createDefaultConversation("whatsapp");
  c.title = "Maya";
  c.messages = [
    { id: "m1", senderId: "other", text: "hey", timestamp: "9:32" },
    { id: "m2", senderId: "self", text: "hi", timestamp: "9:33", receipt: "read" },
  ];
  return c;
};

// ---------------------------------------------------------------- 1. 归一化
report("normalize/platform-mismatch-null", P.normalizeConversation(valid(), "telegram") === null, "iMessage 数据喂给 telegram → null");
report("normalize/garbage-null", P.normalizeConversation({ foo: 1 }, "whatsapp") === null, "结构坏 → null");
report("normalize/primitive-null", P.normalizeConversation("nope", "whatsapp") === null, "非对象 → null");

const round = P.normalizeConversation(valid(), "whatsapp");
report("normalize/roundtrip", !!round && round.title === "Maya" && round.messages.length === 2, `title=${round && round.title} msgs=${round && round.messages.length}`);

// 悬空 senderId 的消息必须被丢掉（否则渲染时取到 undefined 参与者直接崩页）
const dangling = valid();
dangling.messages.push({ id: "m3", senderId: "ghost", text: "boom", timestamp: "9:34" });
const dres = P.normalizeConversation(dangling, "whatsapp");
report("normalize/drop-dangling-sender", !!dres && dres.messages.length === 2, `msgs=${dres && dres.messages.length}（期望 2）`);

// 没有"我" → 整条记录不可用
const noSelf = valid();
noSelf.participants = noSelf.participants.map((p) => ({ ...p, isSelf: false }));
report("normalize/requires-self", P.normalizeConversation(noSelf, "whatsapp") === null, "缺少 isSelf 参与者 → null");

// 超长文本被裁剪
const longText = valid();
longText.messages[0].text = "x".repeat(9000);
const lres = P.normalizeConversation(longText, "whatsapp");
report("normalize/truncates-text", lres.messages[0].text.length === 4000, `len=${lres.messages[0].text.length}（期望 4000）`);

// 非 data:image 的头像被清空
const badAvatar = valid();
badAvatar.avatar = "javascript:alert(1)";
badAvatar.participants[0].avatar = "https://evil.example/x.png";
const ares = P.normalizeConversation(badAvatar, "whatsapp");
report(
  "normalize/rejects-non-dataurl-images",
  ares.avatar === null && ares.participants[0].avatar === null,
  `chat=${ares.avatar} member=${ares.participants[0].avatar}`
);

// 消息全被过滤时回落到默认消息，不能渲染成空白
const allGhost = valid();
allGhost.messages = [{ id: "x", senderId: "ghost", text: "a", timestamp: "1:00" }];
const gres = P.normalizeConversation(allGhost, "whatsapp");
report("normalize/falls-back-to-default-messages", gres.messages.length > 0, `msgs=${gres.messages.length}`);

// 非法 mode / battery 被规整
const weird = valid();
weird.mode = "neon";
weird.statusBar = { time: "1:00", battery: 999, wifi: true, signal: -3 };
const wres = P.normalizeConversation(weird, "whatsapp");
report(
  "normalize/clamps-status",
  wres.mode === "light" && wres.statusBar.battery === 82 && wres.statusBar.signal === 4,
  `mode=${wres.mode} battery=${wres.statusBar.battery} signal=${wres.statusBar.signal}`
);

// ---------------------------------------------------------------- 2. 存 / 读
store.clear();
quota = Infinity;
report("save/ok", P.saveConversation("whatsapp", valid()) === "saved", "正常写入");
const loaded = P.loadConversation("whatsapp");
report("load/roundtrip", !!loaded && loaded.title === "Maya" && loaded.messages.length === 2, loaded ? `title=${loaded.title}` : "null");
report("load/wrong-platform-null", P.loadConversation("telegram") === null, "换平台读同一把键 → null（键本来就不同）");

// 脏数据不会抛异常
store.set("chatmock:v1:conversation:whatsapp", "{not json");
report("load/corrupt-json-safe", P.loadConversation("whatsapp") === null, "JSON 损坏 → null 而非抛错");

// ---------------------------------------------------------------- 3. 配额降级
const big = valid();
big.avatar = "data:image/png;base64," + "A".repeat(6000);
big.messages[0].image = "data:image/png;base64," + "B".repeat(6000);
store.clear();
quota = 1500; // 完整保存放不下，剥掉图片后放得下
const st = P.saveConversation("whatsapp", big);
const downgraded = P.loadConversation("whatsapp");
report("quota/degrades-to-partial", st === "partial", `saveConversation → ${st}（期望 partial）`);
report(
  "quota/keeps-text-drops-images",
  !!downgraded && downgraded.title === "Maya" && downgraded.messages.length === 2 && !downgraded.avatar && !downgraded.messages[0].image,
  downgraded ? `avatar=${downgraded.avatar} img=${downgraded.messages[0].image} title=${downgraded.title}` : "null"
);

quota = 10; // 连剥掉图片的版本都放不下
report("quota/reports-failed", P.saveConversation("whatsapp", big) === "failed", "两次都写不进去 → failed");

// 超大图片不会把整个草稿拖死：文字部分仍在（上一轮 partial 的结果没被覆盖成空）
report("quota/text-survives-total-failure", (P.loadConversation("whatsapp") || {}).title === "Maya", "文字草稿未被清空");

// ---------------------------------------------------------------- 4. 清空
quota = Infinity;
P.saveConversation("whatsapp", valid());
P.clearConversation("whatsapp");
report("clear/removes-key", P.loadConversation("whatsapp") === null && store.size === 0, `剩余键=${store.size}`);

// ---------------------------------------------------------------- 5. 偏好
store.clear();
P.savePrefs({ scale: 3, frame: true });
const prefs = P.loadPrefs();
report("prefs/roundtrip", prefs.scale === 3 && prefs.frame === true, JSON.stringify(prefs));
store.set("chatmock:v1:prefs", JSON.stringify({ scale: 99, frame: "yes" }));
const badPrefs = P.loadPrefs();
report("prefs/rejects-bad-values", badPrefs.scale === undefined && badPrefs.frame === undefined, JSON.stringify(badPrefs));

// ---------------------------------------------------------------- 汇总
const fails = results.filter((r) => !r.pass);
console.log(`\n===== ${results.length - fails.length}/${results.length} PASS =====`);
if (fails.length) {
  console.log("FAILED:", fails.map((f) => f.name).join(", "));
  process.exit(1);
}
