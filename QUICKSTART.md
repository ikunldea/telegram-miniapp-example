# 快速开始指南

## 🚀 5 分钟快速上手

### 第一步：克隆项目

```bash
git clone <你的项目地址>
cd telegram-miniapp-example
```

### 第二步：安装依赖

```bash
pnpm install
```

### 第三步：配置环境变量

1. **复制环境变量模板**：

   ```bash
   cp .env.example .env.local
   ```

2. **编辑 `.env.local` 文件**：
   ```env
   TELEGRAM_BOT_TOKEN=你的Bot Token
   ```

### 第四步：申请 Telegram Bot

1. **打开 Telegram**，搜索 `@BotFather`
2. **点击 "Start"** 开始对话
3. **发送命令**：`/newbot`
4. **设置 Bot 名称**：例如 "SvenlaiWallet Bot"
   - 这个名称会显示在 Bot 的个人资料中
   - 建议使用描述性的名称
5. **设置 Bot 用户名**：例如 `svenlaiwalletbot`
   - 必须以 `bot` 结尾
   - 只能包含字母、数字和下划线
   - 用户名必须是唯一的
6. **复制 Bot Token** 到 `.env.local` 文件
   - 保存这个 Token，不要分享给他人

### 第五步：创建 Mini App

1. **发送命令**：`/myapps`
2. **选择 "Create a new app"** 或直接发送 `/newapp`
3. **选择你的 Bot**
4. **填写信息**：
   - 标题：SvenlaiWallet
   - 描述：安全、便捷的数字钱包
   - 图标：上传 512x512 PNG 图片
   - 短名称：SvenlaiWallet

### 第六步：本地开发

**重要**：Telegram Mini App 要求所有环境都使用 HTTPS，包括开发环境。

1. **启动开发服务器**：

   ```bash
   pnpm dev
   ```

2. **创建 HTTPS 隧道**：

   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```

3. **配置 Mini App URL**：

   - 复制 ngrok 提供的 HTTPS URL
   - 发送 `/myapps` 给 @BotFather
   - 选择你的 Mini App
   - 选择 "App Settings" > "App URL"
   - 输入你的 ngrok HTTPS URL

4. **配置菜单按钮（可选）**：

   - 发送 `/setmenubutton` 给 @BotFather
   - 设置按钮文本：打开钱包
   - 设置按钮 URL：`https://t.me/你的Bot用户名/SvenlaiWallet`

5. **注意事项**：
   - 每次重启 ngrok 都会生成新的 URL
   - 需要重新配置 Bot 的 Mini App URL
   - 确保使用 HTTPS URL，HTTP 不被支持

### 第七步：测试应用

1. **在 Telegram 中找到你的 Bot**
2. **点击菜单按钮**
3. **Mini App 应该正常打开**

## 📋 检查清单

- [ ] 项目依赖已安装
- [ ] 环境变量已配置
- [ ] Telegram Bot 已申请
- [ ] Bot Token 已保存
- [ ] Mini App 已创建
- [ ] 本地服务器已启动
- [ ] HTTPS 隧道已创建
- [ ] Mini App URL 已配置（使用 HTTPS）
- [ ] 菜单按钮已配置（可选）
- [ ] Mini App 可以正常打开
- [ ] 确认使用 HTTPS URL

## 🔧 常用命令

```bash
# 开发
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器

# 代码质量
pnpm lint         # 代码检查
pnpm type-check   # 类型检查
```

## 🐛 常见问题

### 问题：Mini App 无法打开

**解决方案**：

1. 检查 Bot Token 是否正确
2. **确认使用 HTTPS URL**（HTTP 不被支持）
3. 验证域名可访问性
4. 检查 ngrok 隧道是否正常

### 问题：认证失败

**解决方案**：

1. 确认在 Telegram 环境中打开
2. 检查 API 接口是否正常
3. 查看浏览器控制台错误

### 问题：构建失败

**解决方案**：

1. 检查依赖是否正确安装
2. 确认 TypeScript 类型错误
3. 查看构建日志

## 📚 下一步

- 阅读 [完整文档](README.md)
- 查看 [部署指南](DEPLOYMENT.md)
- 学习 [Telegram Bot 配置](TELEGRAM_SETUP.md)
- 自定义你的 Mini App 功能

## 🆘 需要帮助？

- 查看 [常见问题](README.md#常见问题)
- 检查 [故障排除](DEPLOYMENT.md#故障排除)
- 提交 Issue 到项目仓库

---

**提示**：确保你的 Bot Token 安全，不要分享给他人！
