/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/story',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
