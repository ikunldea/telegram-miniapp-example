"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isTMA, retrieveRawInitData } from "@telegram-apps/sdk-react";
import {
  initializeTelegramSDK,
  initializeTelegramSDKOnce,
} from "@/utils/telegram-init";
import { useClientOnce } from "@/hooks/useClientOnce";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramContextType {
  isTelegramEnv: boolean | null;
  initData: string | null;
  user: TelegramUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authenticate: () => Promise<void>;
}

const TelegramContext = createContext<TelegramContextType | undefined>(
  undefined
);

interface TelegramProviderProps {
  children: ReactNode;
}

export function TelegramContextProvider({ children }: TelegramProviderProps) {
  const [isTelegramEnv, setIsTelegramEnv] = useState<boolean | null>(null);
  const [initData, setInitData] = useState<string | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 使用 useClientOnce 确保 TMA 组件挂载只在客户端执行一次
  useClientOnce(() => {
    // 统一初始化 TMA SDK
    initializeTelegramSDKOnce();
  });

  // 使用 useEffect 处理状态更新和认证
  useEffect(() => {
    const handleInitialization = async () => {
      try {
        console.log("TelegramContext: 开始处理状态...");

        // 检测是否为TMA环境
        const isTelegram = isTMA();
        console.log("TelegramContext: TMA 环境检测:", isTelegram);
        setIsTelegramEnv(isTelegram);

        if (isTelegram) {
          try {
            console.log("TelegramContext: 开始获取启动参数...");
            // 获取启动参数
            const rawInitData = await retrieveRawInitData();
            console.log(
              "TelegramContext: 启动参数获取结果:",
              rawInitData ? "成功" : "失败"
            );

            if (rawInitData) {
              setInitData(rawInitData);
              console.log("TelegramContext: 开始认证...");
              // 直接进行认证
              await performAuthentication(rawInitData);
            }
          } catch (error) {
            console.error("TelegramContext: 获取启动参数失败:", error);
          }
        } else {
          console.log("TelegramContext: 非 TMA 环境，跳过初始化");
        }
      } catch (error) {
        console.error("TelegramContext: 状态处理失败:", error);
      } finally {
        console.log("TelegramContext: 状态处理完成，设置 loading 为 false");
        setIsLoading(false);
      }
    };

    handleInitialization();
  }, []);

  // 分离认证逻辑，避免循环依赖
  const performAuthentication = async (rawInitData: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData: rawInitData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("认证失败:", errorData.error);
        setIsAuthenticated(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        console.log("认证成功:", data.user);
      }
    } catch (error) {
      console.error("认证请求失败:", error);
      setIsAuthenticated(false);
    }
  };

  const authenticate = async (rawInitData?: string) => {
    try {
      const dataToSend = rawInitData || initData;
      if (!dataToSend) {
        console.error("没有启动参数，无法认证");
        return;
      }

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData: dataToSend }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("认证失败:", errorData.error);
        setIsAuthenticated(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        console.log("认证成功:", data.user);
      }
    } catch (error) {
      console.error("认证请求失败:", error);
      setIsAuthenticated(false);
    }
  };

  const value: TelegramContextType = {
    isTelegramEnv,
    initData,
    user,
    isLoading,
    isAuthenticated,
    authenticate,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error(
      "useTelegram must be used within a TelegramContextProvider"
    );
  }
  return context;
}
