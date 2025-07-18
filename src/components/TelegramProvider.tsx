"use client";

import {
  TelegramContextProvider,
  useTelegram,
} from "@/contexts/TelegramContext";

interface TelegramProviderProps {
  children: React.ReactNode;
}

function TelegramProviderContent({ children }: TelegramProviderProps) {
  const { isTelegramEnv, isLoading, isAuthenticated } = useTelegram();

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">正在初始化 Telegram 环境...</p>
        </div>
      </div>
    );
  }

  // 如果环境检测完成且不是Telegram环境，显示提示
  if (isTelegramEnv === false) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-yellow-500 text-2xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            请在 Telegram 中打开
          </h2>
          <p className="text-gray-600 mb-4">
            此应用只能在 Telegram Mini App 环境中运行
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
            <p>当前环境检测结果：</p>
            <p>• TMA 环境：{isTelegramEnv ? "是" : "否"}</p>
            <p>• 认证状态：{isAuthenticated ? "已认证" : "未认证"}</p>
          </div>
        </div>
      </div>
    );
  }

  // 如果环境检测完成且是Telegram环境，或者环境检测还未完成，显示内容
  return <>{children}</>;
}

export default function TelegramProvider({ children }: TelegramProviderProps) {
  return (
    <TelegramContextProvider>
      <TelegramProviderContent>{children}</TelegramProviderContent>
    </TelegramContextProvider>
  );
}
