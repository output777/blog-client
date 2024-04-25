/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  images: {
    domains: ['localhost', 'via.placeholder.com'],
  },
};

export default nextConfig;
