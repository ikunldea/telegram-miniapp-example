import { useEffect, useState } from "react";
import { getThemeParams, getMiniApp, getViewport } from "@/utils/telegram-init";

export function useTelegramTheme() {
  const [themeParams, setThemeParams] = useState<unknown>(null);
  const [miniApp, setMiniApp] = useState<unknown>(null);
  const [viewport, setViewport] = useState<unknown>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 只在客户端执行
    if (typeof window === "undefined") {
      return;
    }

    try {
      const theme = getThemeParams();
      const app = getMiniApp();
      const view = getViewport();

      setThemeParams(theme);
      setMiniApp(app);
      setViewport(view);
      setIsReady(true);
    } catch (error) {
      console.error("获取Telegram主题失败:", error);
    }
  }, []);

  return {
    themeParams,
    miniApp,
    viewport,
    isReady,
  };
}
