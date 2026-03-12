/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // Railway backend — allow product images served from backend
        protocol: "https",
        hostname: "*.up.railway.app",
        pathname: "/**",
      },
      {
        // Local development backend
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
