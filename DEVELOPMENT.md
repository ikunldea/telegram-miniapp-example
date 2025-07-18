# 开发环境指南

## TMA 环境初始化

项目现在支持完整的 Telegram Mini App SDK 初始化，包括：

### 初始化流程

1. **环境检测**: 使用 `isTMA()` 检测是否在 Telegram Mini App 环境中
2. **SDK 初始化**: 调用 `init()` 初始化 SDK
3. **模块挂载**:
   - `miniApp.mount()` - 挂载 Mini App 模块
   - `themeParams.mount()` - 挂载主题参数模块
4. **视口挂载**: 挂载视口并绑定 CSS 变量
5. **启动参数获取**: 获取并验证启动参数
6. **用户认证**: 自动调用认证接口

### 使用方式

```typescript
// 在组件中使用 Telegram 状态
import { useTelegram } from "@/contexts/TelegramContext";
import { useTelegramTheme } from "@/hooks/useTelegramTheme";

function MyComponent() {
  const { isTelegramEnv, isAuthenticated, user } = useTelegram();
  const { themeParams, miniApp, viewport, isReady } = useTelegramTheme();

  // 使用状态...
}
```

### 工具函数

项目提供了 `initializeTelegramSDK()` 工具函数，封装了完整的初始化逻辑：

```typescript
import { initializeTelegramSDK } from "@/utils/telegram-init";

const result = await initializeTelegramSDK();
if (result.success) {
  console.log("初始化成功", result.initData);
} else {
  console.error("初始化失败", result.error);
}
```

## 快速开始

### 1. 启动开发服务器

```bash
# 使用 Turbopack（推荐，更快的热重载）
pnpm dev

# 或者使用标准 Webpack
pnpm dev --no-turbopack
```

### 2. 访问应用

- **本地访问**：http://localhost:3000
- **HTTPS 隧道**：使用 ngrok 创建 HTTPS 隧道用于 Telegram 测试

## 热重载功能

### 自动更新

项目配置了自动热重载，当你修改以下文件时，浏览器会自动更新：

- ✅ **React 组件**：`.tsx`, `.jsx` 文件
- ✅ **样式文件**：`.css`, `.scss` 文件
- ✅ **配置文件**：`next.config.ts`, `tailwind.config.js`
- ✅ **API 路由**：`src/app/api/**/*.ts` 文件
- ✅ **页面文件**：`src/app/**/*.tsx` 文件

### 热重载类型

1. **Fast Refresh**：React 组件状态保持，只更新修改的部分
2. **Full Reload**：页面完全重新加载（修改配置文件时）
3. **API 重载**：API 路由自动重新编译

## 开发工具

### 1. 浏览器开发者工具

```javascript
// 在浏览器控制台中查看 Telegram 状态
console.log("Telegram 环境检测:", window.Telegram?.WebApp);

// 查看当前用户信息
console.log("用户信息:", window.Telegram?.WebApp?.initDataUnsafe?.user);
```

### 2. 网络调试

- 打开 **Network** 标签页
- 查看 `/api/auth` 请求
- 检查请求和响应数据

### 3. React 开发者工具

- 安装 React Developer Tools 浏览器扩展
- 查看组件状态和 props
- 调试 TelegramContext 状态

## 调试技巧

### 1. 环境检测调试

```typescript
// 在组件中添加调试信息
const { isTelegramEnv, isAuthenticated, user } = useTelegram();

console.log("环境检测:", {
  isTelegramEnv,
  isAuthenticated,
  user,
  window: typeof window !== "undefined",
});
```

### 2. API 调试

```typescript
// 在 API 路由中添加日志
export async function POST(request: NextRequest) {
  console.log("收到认证请求");

  try {
    const body = await request.json();
    console.log("请求体:", body);

    // ... 处理逻辑

    console.log("认证成功");
  } catch (error) {
    console.error("认证失败:", error);
  }
}
```

### 3. 错误处理

```typescript
// 在组件中添加错误边界
useEffect(() => {
  const handleError = (error: Error) => {
    console.error("Telegram 错误:", error);
  };

  window.addEventListener("error", handleError);
  return () => window.removeEventListener("error", handleError);
}, []);
```

## 开发环境配置

### 1. 环境变量

```env
# .env.local
TELEGRAM_BOT_TOKEN=你的Bot Token
NODE_ENV=development
```

### 2. TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "incremental": true
  }
}
```

### 3. ESLint 配置

```javascript
// eslint.config.mjs
export default {
  extends: ["next/core-web-vitals"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn",
  },
};
```

## 性能优化

### 1. 开发服务器优化

```bash
# 使用 Turbopack（更快）
pnpm dev

# 禁用类型检查（更快启动）
pnpm dev --no-typescript

# 指定端口
pnpm dev -p 3001
```

### 2. 热重载优化

```typescript
// next.config.ts
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};
```

### 3. 内存优化

```bash
# 清理缓存
rm -rf .next
pnpm dev

# 监控内存使用
node --inspect node_modules/.bin/next dev
```

## 常见问题

### Q: 热重载不工作？

**解决方案**：

1. 检查文件是否在正确的目录
2. 重启开发服务器：`pnpm dev`
3. 清除缓存：`rm -rf .next`
4. 检查文件扩展名是否正确

### Q: 修改 API 路由后不更新？

**解决方案**：

1. API 路由需要手动刷新浏览器
2. 或者重启开发服务器
3. 检查 API 路由文件路径

### Q: TypeScript 错误阻止热重载？

**解决方案**：

1. 修复 TypeScript 错误
2. 或者临时使用 `pnpm dev --no-typescript`
3. 检查 `tsconfig.json` 配置

### Q: 样式更新不生效？

**解决方案**：

1. 检查 Tailwind CSS 配置
2. 确保类名正确
3. 重启开发服务器

## 开发工作流

### 1. 日常开发

```bash
# 1. 启动开发服务器
pnpm dev

# 2. 创建 HTTPS 隧道（用于 Telegram 测试）
ngrok http 3000

# 3. 配置 Bot URL
# 发送 /setmenubutton 给 @BotFather

# 4. 在 Telegram 中测试
# 打开你的 Bot，点击菜单按钮
```

### 2. 调试流程

1. **修改代码** → 自动热重载
2. **查看浏览器控制台** → 检查错误
3. **测试功能** → 在 Telegram 中验证
4. **修复问题** → 重复步骤 1-3

### 3. 代码质量

```bash
# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 构建测试
pnpm build
```

## 最佳实践

1. **保持开发服务器运行**：避免频繁重启
2. **使用 Turbopack**：更快的热重载
3. **定期清理缓存**：解决奇怪的问题
4. **监控控制台**：及时发现错误
5. **测试真实环境**：在 Telegram 中验证功能
