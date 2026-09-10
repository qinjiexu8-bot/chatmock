import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 上级目录存在其它 lockfile，不指定会被 Next 误判 workspace root，导致 .next 路径冲突
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
