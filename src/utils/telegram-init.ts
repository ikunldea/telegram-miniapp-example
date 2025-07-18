import {
  init,
  miniApp,
  themeParams,
  viewport,
  closingBehavior,
  isTMA,
  retrieveRawInitData,
} from "@telegram-apps/sdk-react";

export interface TelegramInitResult {
  success: boolean;
  error?: string;
  initData?: string;
}

export async function initializeTelegramSDK(): Promise<TelegramInitResult> {
  try {
    console.log("开始初始化 Telegram SDK...");

    // 检测是否为TMA环境
    const isTelegram = isTMA();
    console.log("TMA 环境检测结果:", isTelegram);

    if (!isTelegram) {
      console.log("不在 Telegram Mini App 环境中，跳过初始化");
      return {
        success: false,
        error: "不在Telegram Mini App环境中",
      };
    }

    console.log("开始初始化 SDK...");
    // 初始化 Telegram SDK
    init();

    console.log("开始挂载模块...");
    // 挂载各个模块
    miniApp.mountSync();
    themeParams.mountSync();
    closingBehavior.mount();

    console.log("开始挂载视口...");
    // 挂载视口并绑定CSS变量
    await viewport
      .mount()
      .then(() => {
        // 定义组件相关的CSS变量
        viewport.bindCssVars();
        miniApp.bindCssVars();
        themeParams.bindCssVars();
        console.log("Telegram SDK 挂载成功");
      })
      .catch((e: unknown) => {
        console.error("挂载视口时出现问题", e);
        throw e;
      });

    console.log("开始获取启动参数...");
    // 获取启动参数
    const rawInitData = await retrieveRawInitData();
    console.log("启动参数获取结果:", rawInitData ? "成功" : "失败");

    return {
      success: true,
      initData: rawInitData || undefined,
    };
  } catch (error) {
    console.error("Telegram SDK 初始化失败:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误",
    };
  }
}

// 使用 useClientOnce 的初始化函数
export function initializeTelegramSDKOnce(): void {
  // 这个函数会在 useClientOnce 中调用，确保只在客户端执行一次
  initializeTelegramSDK().catch((error) => {
    console.error("Telegram SDK 初始化失败:", error);
  });
}

// 获取Telegram主题参数
export function getThemeParams() {
  return themeParams;
}

// 获取Telegram Mini App参数
export function getMiniApp() {
  return miniApp;
}

// 获取Telegram视口参数
export function getViewport() {
  return viewport;
}
