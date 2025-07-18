# Telegram Mini App 初始化功能

## 概述

项目现在支持完整的 Telegram Mini App SDK 初始化，包括环境检测、模块挂载、视口管理和用户认证。

## 初始化流程

### 1. 环境检测

```typescript
import { isTMA } from "@telegram-apps/sdk-react";

const isTelegram = isTMA();
```

### 2. SDK 初始化

```typescript
import { init } from "@telegram-apps/sdk-react";

init();
```

### 3. 模块挂载

```typescript
import {
  miniApp,
  themeParams,
  closingBehavior,
} from "@telegram-apps/sdk-react";

miniApp.mount();
themeParams.mount();
closingBehavior.mount();
```

### 4. 视口挂载和 CSS 变量绑定

```typescript
import { viewport } from "@telegram-apps/sdk-react";

await viewport.mount().then(() => {
  viewport.bindCssVars();
  miniApp.bindCssVars();
  themeParams.bindCssVars();
});
```

### 5. 启动参数获取

```typescript
import { retrieveRawInitData } from "@telegram-apps/sdk-react";

const rawInitData = await retrieveRawInitData();
```

### 6. 用户认证

自动调用 `/api/auth` 接口进行用户认证。

## 工具函数

### initializeTelegramSDK()

封装了完整的初始化逻辑：

```typescript
import { initializeTelegramSDK } from "@/utils/telegram-init";

const result = await initializeTelegramSDK();
if (result.success) {
  console.log("初始化成功", result.initData);
} else {
  console.error("初始化失败", result.error);
}
```

### initializeTelegramSDKOnce()

使用 `useClientOnce` 确保只在客户端执行一次的初始化函数：

```typescript
import { initializeTelegramSDKOnce } from "@/utils/telegram-init";
import { useClientOnce } from "@/hooks/useClientOnce";

// 在组件中使用
useClientOnce(() => {
  initializeTelegramSDKOnce();
});
```

## React Hooks

### useTelegram()

提供 Telegram 环境状态，内部使用 `useClientOnce` 确保 TMA 组件挂载只在客户端执行一次：

```typescript
import { useTelegram } from "@/contexts/TelegramContext";

const { isTelegramEnv, isAuthenticated, user, isLoading } = useTelegram();
```

### useTelegramTheme()

提供 Telegram 主题和视口状态：

```typescript
import { useTelegramTheme } from "@/hooks/useTelegramTheme";

const { themeParams, miniApp, viewport, isReady } = useTelegramTheme();
```

### useClientOnce()

确保代码只在客户端执行一次的 Hook：

```typescript
import { useClientOnce } from "@/hooks/useClientOnce";

// 在组件中使用
useClientOnce(() => {
  // 这里的代码只会在客户端执行一次
  console.log("只在客户端执行一次");
});
```

## 组件使用

### TelegramProvider

包裹应用根组件，提供 Telegram 上下文：

```typescript
import { TelegramProvider } from "@/components/TelegramProvider";

function App() {
  return (
    <TelegramProvider>
      <YourApp />
    </TelegramProvider>
  );
}
```

### TelegramLoader

客户端渲染加载器：

```typescript
import { TelegramLoader } from "@/components/TelegramLoader";

function App() {
  return (
    <TelegramLoader>
      <YourApp />
    </TelegramLoader>
  );
}
```

### TelegramDemo

功能演示组件，展示各种 Telegram SDK 功能：

```typescript
import TelegramDemo from "@/components/TelegramDemo";

function HomePage() {
  return (
    <div>
      <h1>Telegram Mini App</h1>
      <TelegramDemo />
    </div>
  );
}
```

## 功能特性

### 按钮控制

- 主按钮显示/隐藏
- 返回按钮显示/隐藏
- 设置按钮显示/隐藏

### 弹窗功能

- 显示消息弹窗
- 确认弹窗
- 输入提示弹窗

### 窗口控制

- 展开视口
- 关闭应用
- 启用/禁用关闭确认（需要先挂载 closingBehavior 组件）

### 状态监控

- 弹窗状态检测
- 按钮状态检测
- 环境状态检测

## 错误处理

初始化过程中包含完整的错误处理：

```typescript
try {
  const result = await initializeTelegramSDK();
  if (result.success) {
    // 初始化成功
  } else {
    console.error("初始化失败:", result.error);
  }
} catch (error) {
  console.error("初始化异常:", error);
}
```

## 开发调试

### 浏览器控制台

```javascript
// 查看 Telegram 环境
console.log("Telegram 环境:", window.Telegram?.WebApp);

// 查看用户信息
console.log("用户信息:", window.Telegram?.WebApp?.initDataUnsafe?.user);
```

### React 开发者工具

- 查看 `TelegramContext` 状态
- 监控组件重新渲染
- 调试 Hook 状态

## 生产环境注意事项

1. **HTTPS 要求**: 生产环境必须使用 HTTPS
2. **Bot Token 安全**: 确保 Bot Token 不被泄露
3. **错误监控**: 添加错误监控和日志记录
4. **性能优化**: 监控初始化性能
5. **兼容性**: 测试不同 Telegram 客户端版本

## 相关文件

- `src/utils/telegram-init.ts` - 初始化工具函数
- `src/contexts/TelegramContext.tsx` - Telegram 上下文
- `src/hooks/useTelegramTheme.ts` - 主题 Hook
- `src/components/TelegramDemo.tsx` - 功能演示组件
- `src/components/TelegramProvider.tsx` - 提供者组件
- `src/components/TelegramLoader.tsx` - 加载器组件
- `src/app/api/auth/route.ts` - 认证 API
