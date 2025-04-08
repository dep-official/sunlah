import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Docker 배포를 위한 standalone 출력
  async redirects() {
    return [
      {
        source: '/qr-code.php',
        has: [
          {
            type: 'query',
            key: 'id'
          }
        ],
        destination: '/7-billion-project?:query',
        permanent: true,
      }
    ];
  },
  images: {
    domains: ['sunlah.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  transpilePackages: ['zustand'],
};

export default nextConfig; 