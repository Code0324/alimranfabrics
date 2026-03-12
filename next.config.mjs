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
    ],
  },
};

export default nextConfig;
