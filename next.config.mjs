/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    // PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_URL: "https://shooter-frontend-zeta.vercel.app",
    PUBLIC_API_URL: "https://xdmocaadfutbolgameapi.azurewebsites.net",
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    // TIMER: process.env.TIMER,
  },
  reactStrictMode: true,
  // output: "export",
};

export default nextConfig;
