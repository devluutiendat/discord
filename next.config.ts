import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol:"https",
        hostname:"9mga63m9jc.ufs.sh"
      }
    ],
  },
};

export default nextConfig;
