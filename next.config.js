/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'sass')],
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
}

module.exports = nextConfig;
