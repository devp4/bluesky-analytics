import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bsky.app',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
