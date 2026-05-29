import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: __dirname
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
