import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
    dangerouslyAllowSVG: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
