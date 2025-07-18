"use client";

import { useEffect, useState } from "react";

// 声明 Telegram 类型
declare global {
  interface Window {
    Telegram?: {
      WebApp?: any;
    };
  }
}

export default function TestPage() {
  const [status, setStatus] = useState("初始化中...");

  useEffect(() => {
    const checkEnvironment = () => {
      setStatus("检查环境中...");

      // 检查基本环境
      if (typeof window === "undefined") {
        setStatus("服务端环境");
        return;
      }

      setStatus("客户端环境检测完成");

      // 检查 Telegram 对象
      if ((window as any).Telegram) {
        setStatus("Telegram 对象存在");

        if ((window as any).Telegram.WebApp) {
          setStatus("Telegram WebApp 存在");
        } else {
          setStatus("Telegram WebApp 不存在");
        }
      } else {
        setStatus("Telegram 对象不存在");
      }
    };

    // 延迟执行，确保页面完全加载
    setTimeout(checkEnvironment, 1000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">环境测试</h1>
        <p className="text-gray-600 mb-4">{status}</p>

        <div className="bg-gray-100 p-4 rounded text-left text-sm">
          <p>
            <strong>window:</strong>{" "}
            {typeof window !== "undefined" ? "存在" : "不存在"}
          </p>
          <p>
            <strong>document:</strong>{" "}
            {typeof document !== "undefined" ? "存在" : "不存在"}
          </p>
          <p>
            <strong>Telegram:</strong>{" "}
            {typeof window !== "undefined" && (window as any).Telegram
              ? "存在"
              : "不存在"}
          </p>
          <p>
            <strong>WebApp:</strong>{" "}
            {typeof window !== "undefined" && (window as any).Telegram?.WebApp
              ? "存在"
              : "不存在"}
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          刷新
        </button>
      </div>
    </div>
  );
}
