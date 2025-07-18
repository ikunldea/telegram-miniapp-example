# Telegram Mini App 示例

这是一个使用 Next.js 和 Telegram Mini App SDK 构建的示例项目。

## 功能特性

- ✅ Telegram Mini App 认证
- ✅ 启动参数验证
- ✅ JWT Token 生成
- ✅ 客户端渲染支持
- ✅ 响应式 UI 设计

## 📚 文档导航

- [快速开始指南](QUICKSTART.md) - 5 分钟快速上手
- [开发环境指南](DEVELOPMENT.md) - 开发环境配置和热重载说明
- [部署指南](DEPLOYMENT.md) - 详细的部署说明
- [Telegram Bot 配置](TELEGRAM_SETUP.md) - Bot 创建和配置指南
- [JWT 配置指南](JWT_SETUP.md) - JWT 库配置和升级指南
- [HTTPS 配置指南](HTTPS_SETUP.md) - HTTPS 配置和 ngrok 使用指南

## 快速开始

### 完整配置流程

1. **申请 Telegram Bot** → 获取 Bot Token
2. **创建 Mini App** → 通过 `/myapps` 命令
3. **配置 Mini App URL** → 设置应用地址
4. **配置菜单按钮** → 设置 Bot 菜单
5. **测试应用** → 验证功能正常

### 1. 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 2. 环境配置

复制环境变量模板文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填写你的 Telegram Bot Token：

```env
# Telegram Bot Token (从 @BotFather 获取)
TELEGRAM_BOT_TOKEN=你的Bot Token
```

### 3. 运行项目

#### 开发模式

```bash
# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目。

#### 生产模式

```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start
```

### 4. 项目打包

```bash
# 构建生产版本
pnpm build

# 构建产物位于 .next 目录
```

## Telegram Bot 配置指南

### 1. 申请 Telegram Bot

1. **打开 Telegram**，搜索 `@BotFather`
2. **点击 "Start"** 开始对话
3. **发送命令** `/newbot`
4. **设置 Bot 名称**（例如：SvenlaiWallet Bot）
   - 这个名称会显示在 Bot 的个人资料中
   - 建议使用描述性的名称
5. **设置 Bot 用户名**（必须以 `bot` 结尾，例如：svenlaiwalletbot）
   - 用户名必须是唯一的
   - 只能包含字母、数字和下划线
   - 必须以 `bot` 结尾
6. **获取 Bot Token**，格式类似：`1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
   - 保存这个 Token，它用于你的应用程序中
   - 不要分享给他人，它控制你的 Bot

### 2. 配置 Bot 基本信息（可选）

创建 Bot 后，你可以配置一些基本信息：

#### 设置 Bot 描述

- 发送命令：`/setdescription`
- 输入描述文本，例如："SvenlaiWallet - 安全、便捷的数字钱包"

#### 设置关于信息

- 发送命令：`/setabouttext`
- 输入关于信息，例如："支持多种加密货币管理的数字钱包"

#### 设置命令列表

- 发送命令：`/setcommands`
- 输入命令列表，例如：
  ```
  start - 开始使用钱包
  balance - 查看余额
  send - 发送加密货币
  ```

### 3. 创建 Mini App

1. **发送命令** `/myapps` 给 @BotFather
2. **选择 "Create a new app"** 或 **发送命令** `/newapp`
3. **选择你的 Bot**
4. **设置 Mini App 标题**（例如：SvenlaiWallet）
5. **设置 Mini App 描述**（简短描述你的应用功能，例如：安全、便捷的数字钱包）
6. **上传 Mini App 图标**（512x512 PNG 格式）
7. **设置 Mini App 短名称**（用于 URL，例如：SvenlaiWallet）

### 4. 配置 Mini App URL

1. **获取你的应用 URL**（开发环境或生产环境）

   - 开发环境：使用 ngrok 创建 HTTPS 隧道
   - 生产环境：`https://your-domain.com`

2. **发送命令** `/myapps` 给 @BotFather
3. **选择你的 Mini App**
4. **选择 "App Settings"**
5. **选择 "App URL"**
6. **输入你的应用 URL**（必须是 HTTPS）

### 5. 配置菜单按钮（可选）

1. **发送命令** `/setmenubutton` 给 @BotFather
2. **选择你的 Bot**
3. **设置按钮文本**（例如：打开钱包）
4. **设置按钮 URL**：`https://t.me/你的Bot用户名/你的MiniApp短名称`

### 6. 获取 Mini App 链接

创建完成后，你会获得类似这样的链接：

```
https://t.me/你的Bot用户名/你的MiniApp短名称
```

例如：`https://t.me/svenlaiwalletbot/SvenlaiWallet`

### 7. 测试 Mini App

1. **在 Telegram 中找到你的 Bot**
2. **点击菜单按钮或发送命令**
3. **Mini App 将在 Telegram 中打开**
4. **验证认证功能是否正常工作**

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── route.ts          # 认证 API 接口
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主页面
└── components/
    ├── TelegramLoader.tsx        # Telegram 认证加载器
    └── TelegramProvider.tsx      # Telegram SDK 提供者
```

## 核心组件

### TelegramLoader

- 验证 Telegram 启动参数
- 显示加载状态和错误信息
- 保护应用内容

### TelegramProvider

- 配置 Telegram SDK
- 提供 SDK 上下文

### /api/auth 接口

- 验证启动参数有效性
- 生成 JWT Token
- 设置认证 Cookie

## API 使用说明

### 认证接口

**端点**：`POST /api/auth`

**请求体**：

```json
{
  "initData": "Telegram启动参数字符串"
}
```

**响应**：

```json
{
  "success": true,
  "user": {
    "id": 123456789,
    "first_name": "用户",
    "last_name": "姓名",
    "username": "username"
  }
}
```

**Cookie**：

- `telegram_token`: JWT 认证令牌（使用简单的 base64 编码，生产环境建议使用专业的 JWT 库）

## 部署指南

### Vercel 部署

1. **推送代码到 GitHub**
2. **在 Vercel 中导入项目**
3. **设置环境变量**：
   - `TELEGRAM_BOT_TOKEN`: 你的 Bot Token
4. **部署项目**
5. **更新 Bot 的 Mini App URL** 为你的 Vercel 域名

### 其他平台部署

1. **构建项目**：`pnpm build`
2. **上传 `.next` 目录到服务器**
3. **配置环境变量**
4. **启动服务**：`pnpm start`

## 开发注意事项

### 本地开发

- 使用 `ngrok` 或类似工具创建 HTTPS 隧道
- 更新 Bot 的 Mini App URL 为你的隧道地址
- 确保环境变量正确配置

### 调试技巧

1. **检查浏览器控制台**查看错误信息
2. **验证 Bot Token**是否正确
3. **确认 Mini App URL**配置正确
4. **检查网络请求**是否成功

## 常见问题

### Q: Mini App 无法打开

A: 检查 Bot Token 和 Mini App URL 配置是否正确

### Q: 认证失败

A: 确认在 Telegram 环境中打开，检查 API 接口是否正常

### Q: 构建失败

A: 检查依赖是否正确安装，确认 TypeScript 类型错误

## 技术栈

- Next.js 15
- TypeScript
- Tailwind CSS
- @telegram-apps/sdk-react
- @telegram-apps/init-data-node

## 注意事项

- 此应用只能在 Telegram 环境中正常运行
- 需要有效的 Bot Token
- 建议在生产环境中使用专业的 JWT 库
- **生产环境 Mini App URL 必须是 HTTPS**
- **开发环境可通过 ngrok 创建 HTTPS 隧道进行调试**

## 许可证

MIT License
