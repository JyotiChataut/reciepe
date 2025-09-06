import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.themealdb.com" }, // allow MealDB images
    ],
  },
};

export default nextConfig;
