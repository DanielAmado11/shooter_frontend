/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  },
};

export default nextConfig;
