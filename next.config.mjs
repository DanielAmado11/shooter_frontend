/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_API_URL: "https://xdmocaadfutbolgameapi.azurewebsites.net",
    // PUBLIC_API_URL: "http://localhost:3001",
  },
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
  // output: "export",
};

export default nextConfig;
