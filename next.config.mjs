/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_API_URL: "https://xdmocaadfutbolgameapi.azurewebsites.net",
  },
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
  // output: "export",
};

export default nextConfig;
