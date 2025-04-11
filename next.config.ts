import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-synology-nas-ip', 'your-synology-domain.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'your-synology-nas-ip',
        port: '5000',
        pathname: '/sharing/**',
      },
      {
        protocol: 'https',
        hostname: 'your-synology-domain.com',
        port: '',
        pathname: '/sharing/**',
      },
    ],
  },
};

export default nextConfig;
