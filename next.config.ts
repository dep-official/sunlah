import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/qr-code.php',
        destination: '/qr-code.php/page',
      },
    ];
  },
};

export default nextConfig;
