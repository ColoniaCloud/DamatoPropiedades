import type { NextConfig } from "next";

const csp = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tile.openstreetmap.org; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: http:; font-src 'self' https://fonts.gstatic.com data:; frame-src https://www.google.com; media-src 'self' https://res.cloudinary.com; connect-src 'self' https://*.tokkobroker.com https://*.tile.openstreetmap.org";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tokkobroker.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "static.tokkobroker.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Content-Security-Policy", value: csp.replace(/\s+/g, " ").trim() },
        ],
      },
    ];
  },
};

export default nextConfig;
