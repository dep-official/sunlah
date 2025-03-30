import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/qr-code.php',
        destination: '/7-billion-project/page',
      },
      // QR 코드의 id와 lang 파라미터 처리
      {
        source: '/qr-code.php/:path*',
        destination: '/7-billion-project/:path*',
      }
    ];
  },

  // 리다이렉트 설정 (필요한 경우)
  async redirects() {
    return [
      {
        // 쿼리 파라미터가 있는 경우의 리다이렉트
        source: '/qr-code.php',
        has: [
          {
            type: 'query',
            key: 'id',
          }
        ],
        // 모든 쿼리 파라미터를 유지하면서 리다이렉트
        destination: '/7-billion-project?id=:id',
        permanent: true,
      },
      // 기본 경로 리다이렉트
      {
        source: '/qr-code.php',
        destination: '/7-billion-project',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
