/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
};

export default nextConfig; 