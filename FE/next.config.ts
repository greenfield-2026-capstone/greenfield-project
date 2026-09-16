import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "commons.wikimedia.org"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "minio.nculture.org"
      },
      {
        protocol: "https",
        hostname: "wimg.sedaily.com"
      },
      {
        protocol: "https",
        hostname: "www.dwbnews.kr"
      },
      {
        protocol: "https",
        hostname: "theme.archives.go.kr"
      },
      {
        protocol: "https",
        hostname: "tour.paju.go.kr"
      },
      {
        protocol: "https",
        hostname: "cdn.orangenews.hk"
      }
    ]
  }
};

export default nextConfig;
