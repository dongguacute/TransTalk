import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  title: "TransTalk",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: './',
  },
};

export default nextConfig;
