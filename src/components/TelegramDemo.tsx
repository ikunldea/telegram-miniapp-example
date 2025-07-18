"use client";

import { useTelegram } from "@/contexts/TelegramContext";
import { useTelegramTheme } from "@/hooks/useTelegramTheme";
import {
  mainButton,
  backButton,
  settingsButton,
  showPopup,
  expandViewport,
  closeMiniApp,
  isPopupOpened,
  isPopupShown,
  isPopupSupported,
  closingBehavior,
} from "@telegram-apps/sdk-react";

export default function TelegramDemo() {
  const { isTelegramEnv, isAuthenticated, user } = useTelegram();
  const { themeParams, miniApp, viewport, isReady } = useTelegramTheme();

  const handleShowMainButton = () => {
    mainButton.setParams({ text: "主按钮" });
    mainButton.onClick(() => {
      showPopup({ message: "主按钮被点击！" });
    });
  };

  const handleHideMainButton = () => {
    mainButton.unmount();
  };

  const handleShowBackButton = () => {
    backButton.onClick(() => {
      showPopup({ message: "返回按钮被点击！" });
    });
  };

  const handleHideBackButton = () => {
    backButton.unmount();
  };

  const handleShowSettingsButton = () => {
    settingsButton.onClick(() => {
      showPopup({ message: "设置按钮被点击！" });
    });
  };

  const handleHideSettingsButton = () => {
    settingsButton.unmount();
  };

  const handleShowPopup = () => {
    showPopup({ message: "这是一个测试弹窗！" });
  };

  const handleExpand = () => {
    expandViewport();
  };

  const handleClose = () => {
    closeMiniApp();
  };

  if (!isTelegramEnv) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        ⚠️ 此功能仅在 Telegram Mini App 环境中可用
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Telegram SDK 功能演示
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 按钮控制 */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">按钮控制</h3>
          <div className="space-y-2">
            <button
              onClick={handleShowMainButton}
              className="w-full bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              显示主按钮
            </button>
            <button
              onClick={handleHideMainButton}
              className="w-full bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
            >
              隐藏主按钮
            </button>
            <button
              onClick={handleShowBackButton}
              className="w-full bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
            >
              显示返回按钮
            </button>
            <button
              onClick={handleHideBackButton}
              className="w-full bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
            >
              隐藏返回按钮
            </button>
            <button
              onClick={handleShowSettingsButton}
              className="w-full bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600"
            >
              显示设置按钮
            </button>
            <button
              onClick={handleHideSettingsButton}
              className="w-full bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
            >
              隐藏设置按钮
            </button>
          </div>
        </div>

        {/* 弹窗功能 */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">弹窗功能</h3>
          <div className="space-y-2">
            <button
              onClick={handleShowPopup}
              className="w-full bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
            >
              显示弹窗
            </button>
            <button
              onClick={() => showPopup({ message: "确认执行此操作？" })}
              className="w-full bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600"
            >
              显示确认弹窗
            </button>
            <button
              onClick={() => showPopup({ message: "请输入您的姓名：" })}
              className="w-full bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600"
            >
              显示输入提示
            </button>
          </div>
        </div>

        {/* 窗口控制 */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">窗口控制</h3>
          <div className="space-y-2">
            <button
              onClick={handleExpand}
              className="w-full bg-teal-500 text-white px-3 py-2 rounded text-sm hover:bg-teal-600"
            >
              展开窗口
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
            >
              关闭应用
            </button>
            <button
              onClick={() => {
                if (closingBehavior.isMounted()) {
                  closingBehavior.enableConfirmation();
                } else {
                  showPopup({ message: "closingBehavior 组件未挂载" });
                }
              }}
              className="w-full bg-pink-500 text-white px-3 py-2 rounded text-sm hover:bg-pink-600"
            >
              启用关闭确认
            </button>
            <button
              onClick={() => {
                if (closingBehavior.isMounted()) {
                  closingBehavior.disableConfirmation();
                } else {
                  showPopup({ message: "closingBehavior 组件未挂载" });
                }
              }}
              className="w-full bg-cyan-500 text-white px-3 py-2 rounded text-sm hover:bg-cyan-600"
            >
              禁用关闭确认
            </button>
          </div>
        </div>
      </div>

      {/* 状态信息 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">弹窗状态</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">弹窗已打开:</span>{" "}
            {isPopupOpened() ? "是" : "否"}
          </div>
          <div>
            <span className="font-medium">弹窗已显示:</span>{" "}
            {isPopupShown() ? "是" : "否"}
          </div>
          <div>
            <span className="font-medium">支持弹窗:</span>{" "}
            {isPopupSupported() ? "是" : "否"}
          </div>
        </div>
      </div>
    </div>
  );
}
