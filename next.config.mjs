/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  images: {
    domains: [
      'localhost',
      'via.placeholder.com',
      'blog-static-file.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

export default nextConfig;
