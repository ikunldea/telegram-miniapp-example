"use client";

import { useEffect, useState } from "react";

interface TelegramLoaderProps {
  children: React.ReactNode;
}

export default function TelegramLoader({ children }: TelegramLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 给TelegramProvider一些时间来初始化
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载应用...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
