import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@twofold/ui","@twofold/blocks","@twofold/plugins-calcom"],
};

export default nextConfig;
