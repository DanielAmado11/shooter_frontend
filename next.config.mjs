/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    PUBLIC_API_URL: "https://xdmocaadfutbolgameapi.azurewebsites.net",
    // TIMER: process.env.TIMER,
  },
  reactStrictMode: true,
  // output: "export",
};

export default nextConfig;
