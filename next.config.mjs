/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  },
  reactStrictMode: true,
  // output: "export",
};

export default nextConfig;
