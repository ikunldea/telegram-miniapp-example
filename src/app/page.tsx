"use client";

import { openTelegramLink } from "@telegram-apps/sdk-react";
import { useTelegram } from "@/contexts/TelegramContext";
import { useTelegramTheme } from "@/hooks/useTelegramTheme";
import TelegramDemo from "@/components/TelegramDemo";

export default function Home() {
  const { isTelegramEnv, isAuthenticated, user, isLoading } = useTelegram();
  const { isReady } = useTelegramTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在初始化...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚀 Telegram Mini App
          </h1>
          <p className="text-lg text-gray-600">
            欢迎使用我们的Telegram Mini App示例
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            案例展示
          </h2>
          <div className="text-gray-600">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 items-center">
                <p className="text-gray-600">Native Link</p>
                <p>
                  <button
                    onClick={() => {
                      window.location.href =
                        "https://t.me/socialwalletbot/SocialWallet";
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Open Mini App
                  </button>
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-gray-600">SDK Link</p>
                <p>
                  <button
                    onClick={() => {
                      openTelegramLink(
                        "https://t.me/socialwalletbot/SocialWallet"
                      );
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Open Mini App
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            环境检测
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Telegram 环境:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isTelegramEnv
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isTelegramEnv ? "✅ 是" : "❌ 否"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">认证状态:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isAuthenticated
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {isAuthenticated ? "✅ 已认证" : "⏳ 未认证"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">SDK 就绪:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isReady
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {isReady ? "✅ 是" : "⏳ 否"}
              </span>
            </div>
          </div>
        </div>

        {/* 用户信息 */}
        {user && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              用户信息
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-gray-800">
                <span className="font-medium ">用户ID:</span> {user.id}
              </div>
              <div className="text-gray-800">
                <span className="font-medium ">用户名:</span> {user.username}
              </div>
              <div className="text-gray-800">
                <span className="font-medium ">姓名:</span> {user.first_name}
                {user.last_name && ` ${user.last_name}`}
              </div>
              <div className="text-gray-800">
                <span className="font-medium ">语言:</span> {user.language_code}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            功能说明
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Telegram认证</h3>
                <p className="text-gray-600">
                  通过Telegram启动参数验证用户身份
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">JWT Token生成</h3>
                <p className="text-gray-600">
                  生成安全的JWT令牌并存储在Cookie中
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">客户端渲染</h3>
                <p className="text-gray-600">
                  使用客户端渲染确保Telegram SDK正常工作
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Telegram SDK 功能演示 */}
        <TelegramDemo />

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            这个页面只有在Telegram中打开时才能正常显示
          </p>
        </div>
      </main>
    </div>
  );
}
