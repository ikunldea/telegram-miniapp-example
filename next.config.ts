import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 开发环境配置
  reactStrictMode: true,

  // 热重载配置
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // 确保开发环境的热重载正常工作
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },

  // 实验性功能
  experimental: {
    // 启用 Turbopack（更快的开发服务器）
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
