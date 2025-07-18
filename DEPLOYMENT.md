# 部署指南

## 环境变量配置

### 1. 创建环境变量文件

复制环境变量模板：

```bash
cp .env.example .env.local
```

### 2. 配置环境变量

编辑 `.env.local` 文件：

```env
# Telegram Bot Token (从 @BotFather 获取)
TELEGRAM_BOT_TOKEN=你的Bot Token
```

## 本地开发

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

### 3. 创建 HTTPS 隧道（本地开发必需）

**重要**：Telegram Mini App 要求所有环境都使用 HTTPS，包括开发环境。

#### 安装 ngrok

```bash
# 安装 ngrok
npm install -g ngrok

# 或者从官网下载：https://ngrok.com/download
```

#### 创建 HTTPS 隧道

```bash
# 启动你的开发服务器
pnpm dev

# 在另一个终端创建隧道
ngrok http 3000
```

#### 配置 Bot URL

ngrok 会提供一个 HTTPS URL，例如：`https://abc123.ngrok.io`

1. 复制这个 HTTPS URL
2. 发送 `/setmenubutton` 命令给 @BotFather
3. 选择你的 Bot
4. 设置按钮文本：打开应用
5. 设置按钮 URL：你的 ngrok HTTPS URL

#### 注意事项

- **每次重启 ngrok 都会生成新的 URL**
- **免费版 ngrok 有连接数限制**
- **建议使用付费版 ngrok 获得固定域名**
- **确保 ngrok URL 可以正常访问**

### 4. 配置 Bot URL

将 ngrok 提供的 HTTPS URL 配置到你的 Bot：

```
https://your-ngrok-url.ngrok.io
```

**重要提醒**：

- 必须使用 HTTPS URL，HTTP 不被 Telegram 支持
- 确保 URL 可以正常访问
- 每次重启 ngrok 需要重新配置 Bot URL

## 生产部署

### Vercel 部署（推荐）

1. **推送代码到 GitHub**

2. **在 Vercel 中导入项目**

   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库

3. **配置环境变量**

   - 在项目设置中添加环境变量
   - `TELEGRAM_BOT_TOKEN`: 你的 Bot Token

4. **部署项目**

   - Vercel 会自动构建和部署

5. **更新 Bot 配置**
   - 将 Mini App URL 更新为你的 Vercel 域名
   - 例如：`https://your-app.vercel.app`
   - **确保使用 HTTPS URL**

### 其他平台部署

#### 1. 构建项目

```bash
pnpm build
```

#### 2. 上传文件

将以下文件和目录上传到服务器：

- `.next/` 目录
- `public/` 目录
- `package.json`
- `pnpm-lock.yaml`

#### 3. 安装依赖

```bash
pnpm install --production
```

#### 4. 配置环境变量

在服务器上创建 `.env.local` 文件并配置环境变量。

#### 5. 启动服务

```bash
pnpm start
```

## Telegram Bot 配置

### 1. 创建 Bot

1. 在 Telegram 中搜索 `@BotFather`
2. 发送 `/newbot` 命令
3. 设置 Bot 名称和用户名
4. 获取 Bot Token

### 2. 申请 Mini App

1. 发送 `/newapp` 命令给 @BotFather
2. 选择你的 Bot
3. 填写 Mini App 信息：
   - 标题
   - 描述
   - 图标（512x512 PNG）
   - 短名称

### 3. 配置 Mini App URL

1. 发送 `/setmenubutton` 命令
2. 选择你的 Bot
3. 设置按钮文本
4. 设置按钮 URL 为你的应用地址

### 4. 测试 Mini App

1. 在 Telegram 中找到你的 Bot
2. 点击菜单按钮
3. Mini App 应该正常打开

## 故障排除

### 常见问题

1. **Mini App 无法打开**

   - 检查 URL 是否正确
   - 确认使用 HTTPS
   - 验证 Bot Token

2. **认证失败**

   - 检查环境变量配置
   - 确认在 Telegram 环境中打开
   - 查看浏览器控制台错误

3. **构建失败**
   - 检查依赖是否正确安装
   - 确认 TypeScript 类型错误
   - 查看构建日志

### 调试技巧

1. **检查网络请求**

   - 打开浏览器开发者工具
   - 查看 Network 标签页
   - 确认 API 请求是否成功

2. **验证环境变量**

   - 确认 `.env.local` 文件存在
   - 检查变量名是否正确
   - 重启开发服务器

3. **测试 API 接口**
   - 使用 Postman 或 curl 测试 `/api/auth` 接口
   - 确认返回正确的响应

## 安全注意事项

1. **保护 Bot Token**

   - 不要将 Token 提交到代码仓库
   - 使用环境变量存储
   - 定期更换 Token

2. **HTTPS 要求**

   - 生产环境必须使用 HTTPS
   - 本地开发使用 HTTPS 隧道

3. **输入验证**
   - 验证所有用户输入
   - 使用 Telegram SDK 验证启动参数

## 性能优化

1. **代码分割**

   - Next.js 自动进行代码分割
   - 使用动态导入减少初始包大小

2. **缓存策略**

   - 配置适当的缓存头
   - 使用 CDN 加速静态资源

3. **监控**
   - 监控应用性能
   - 设置错误报警
   - 跟踪用户行为
