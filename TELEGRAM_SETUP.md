# Telegram Bot 配置指南

## 📋 配置流程概览

1. **申请 Telegram Bot** - 创建 Bot 并获取 Token
2. **配置 Bot 信息** - 设置描述、关于信息等（可选）
3. **创建 Mini App** - 通过 `/myapps` 命令创建应用
4. **配置 Mini App URL** - 设置应用地址（必须是 HTTPS）
5. **配置菜单按钮** - 设置 Bot 菜单（可选）
6. **测试应用** - 验证 Mini App 功能

## 申请 Telegram Bot

### 1. 找到 BotFather

1. 打开 Telegram 应用
2. 在搜索框中输入 `@BotFather`
3. 点击搜索结果中的 `@BotFather`
4. 点击 "Start" 开始对话

### 2. 申请新 Bot

1. 发送命令：`/newbot`
2. BotFather 会要求你输入 Bot 名称
   - 输入一个描述性的名称，例如："SvenlaiWallet Bot"
   - 这个名称会显示在 Bot 的个人资料中
   - 建议使用描述性的名称，让用户知道 Bot 的用途
3. 然后输入 Bot 用户名
   - 必须以 `bot` 结尾
   - 例如：`svenlaiwalletbot`
   - 用户名必须是唯一的
   - 只能包含字母、数字和下划线
   - 不能包含空格或特殊字符
4. 如果用户名可用，BotFather 会返回成功消息和 Bot Token

### 3. 保存 Bot Token

BotFather 会返回类似这样的消息：

```
Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

**重要**：

- 保存这个 Token，它用于你的应用程序中
- 不要分享给他人，它控制你的 Bot
- 如果 Token 泄露，立即联系 @BotFather 重新生成

### 4. 配置 Bot 基本信息（可选）

创建 Bot 后，你可以配置一些基本信息：

#### 设置 Bot 描述

1. 发送命令：`/setdescription`
2. 选择你的 Bot
3. 输入描述文本，例如："SvenlaiWallet - 安全、便捷的数字钱包"

#### 设置关于信息

1. 发送命令：`/setabouttext`
2. 选择你的 Bot
3. 输入关于信息，例如："支持多种加密货币管理的数字钱包"

#### 设置命令列表

1. 发送命令：`/setcommands`
2. 选择你的 Bot
3. 输入命令列表，例如：
   ```
   start - 开始使用钱包
   balance - 查看余额
   send - 发送加密货币
   ```

## 创建 Mini App

### 1. 使用 /myapps 命令

1. 在 @BotFather 对话中发送：`/myapps`
2. BotFather 会显示你的 Mini App 列表
3. 选择 "Create a new app" 或直接发送 `/newapp`

### 2. 选择 Bot

1. BotFather 会显示你的 Bot 列表
2. 选择你刚创建的 Bot

### 3. 填写 Mini App 信息

BotFather 会依次要求你填写以下信息：

#### 应用标题

- 输入你的 Mini App 标题
- 例如："SvenlaiWallet"
- 这个标题会显示在 Mini App 中

#### 应用描述

- 简短描述你的应用功能
- 例如："安全、便捷的数字钱包，支持多种加密货币管理"
- 描述会帮助用户了解应用用途

#### 应用图标

- 上传一个 512x512 像素的 PNG 图片
- 图标会显示在 Mini App 中
- 确保图片清晰且符合你的品牌

#### 应用短名称

- 输入一个简短的名称，用于 URL
- 例如：`SvenlaiWallet`
- 这个名称会出现在 Mini App 的 URL 中

### 4. 获取 Mini App 信息

创建成功后，BotFather 会返回 Mini App 的详细信息，包括：

- Mini App 的 URL（格式：`https://t.me/你的Bot用户名/你的MiniApp短名称`）
- 应用 ID
- 其他相关信息

## 配置 Mini App URL

### 1. 使用 /myapps 配置

1. 发送命令：`/myapps`
2. 选择你的 Mini App
3. 选择 "App Settings"
4. 选择 "App URL"
5. 输入你的应用 URL（必须是 HTTPS）

### 2. 设置菜单按钮（可选）

1. 发送命令：`/setmenubutton`
2. 选择你的 Bot
3. 输入按钮文本，例如："打开钱包"
4. 输入你的应用 URL

### 3. URL 格式

Mini App URL 的格式为：

```
https://t.me/你的Bot用户名/你的MiniApp短名称
```

例如：

```
https://t.me/svenlaiwalletbot/SvenlaiWallet
```

### 3. 开发环境配置

**重要**：Telegram Mini App 要求所有环境都使用 HTTPS，包括开发环境。

对于本地开发，你需要：

1. **使用 HTTPS 隧道**

   ```bash
   # 安装 ngrok
   npm install -g ngrok

   # 启动你的开发服务器
   pnpm dev

   # 在另一个终端启动隧道
   ngrok http 3000
   ```

2. **配置 Bot URL**

   - 复制 ngrok 提供的 HTTPS URL
   - 发送 `/setmenubutton` 命令给 @BotFather
   - 设置按钮文本：打开应用
   - 设置按钮 URL：你的 ngrok HTTPS URL
   - 例如：`https://abc123.ngrok.io`

3. **注意事项**
   - 每次重启 ngrok 都会生成新的 URL
   - 需要重新配置 Bot 的 Mini App URL
   - 免费版 ngrok 有连接数限制
   - 建议使用付费版 ngrok 获得固定域名

### 4. 生产环境配置

对于生产环境：

1. **部署你的应用**到支持 HTTPS 的平台
2. **获取你的域名**，例如：`https://myapp.vercel.app`
3. **更新 Bot 配置**，将 Mini App URL 设置为你的生产域名
4. **确保使用 HTTPS URL**，HTTP 不被 Telegram 支持

## 测试 Mini App

### 1. 找到你的 Bot

1. 在 Telegram 中搜索你的 Bot 用户名
2. 点击 "Start" 开始对话
3. 你应该能看到菜单按钮

### 2. 打开 Mini App

1. 点击菜单按钮
2. Mini App 应该在 Telegram 中打开
3. 验证认证功能是否正常工作

### 3. 调试技巧

如果 Mini App 无法正常打开：

1. **检查 URL 配置**

   - 确认 URL 格式正确
   - 验证域名是否可访问

2. **检查 HTTPS**

   - 确保使用 HTTPS 协议
   - 本地开发使用 HTTPS 隧道

3. **查看错误信息**
   - 在 Telegram 中查看错误提示
   - 检查浏览器控制台

## Bot 管理命令

### 常用命令

- `/mybots` - 查看你的所有 Bot
- `/myapps` - 查看和管理你的所有 Mini App
- `/setmenubutton` - 设置菜单按钮
- `/deletebot` - 删除 Bot
- `/setcommands` - 设置 Bot 命令列表
- `/setdescription` - 设置 Bot 描述
- `/setabouttext` - 设置关于信息

## /myapps 命令详解

### 1. 查看 Mini App 列表

发送 `/myapps` 命令，BotFather 会显示你创建的所有 Mini App：

```
Your Mini Apps:

1. SvenlaiWallet - @svenlaiwalletbot
2. MyApp - @myapp_bot

Select a Mini App to manage it, or create a new one.
```

### 2. 创建新的 Mini App

1. 发送 `/myapps`
2. 选择 "Create a new app"
3. 按照提示填写信息

### 3. 管理现有 Mini App

选择现有的 Mini App 后，你可以：

#### App Settings（应用设置）

- **App Title** - 修改应用标题
- **App Description** - 修改应用描述
- **App Icon** - 更换应用图标
- **App URL** - 设置应用 URL（重要）
- **App Short Name** - 修改应用短名称

#### App Statistics（应用统计）

- 查看应用使用统计
- 查看用户访问数据

#### Delete App（删除应用）

- 永久删除 Mini App

### 4. 配置 App URL

这是最重要的设置：

1. 选择你的 Mini App
2. 选择 "App Settings"
3. 选择 "App URL"
4. 输入你的应用 URL

**URL 要求**：

- 必须是 HTTPS 协议
- 开发环境可以使用 ngrok 等 HTTPS 隧道
- 生产环境必须是真实的 HTTPS 域名

**示例**：

```
开发环境：https://abc123.ngrok.io
生产环境：https://myapp.vercel.app
```

### 高级配置

#### 设置 Bot 描述

```
/setdescription
选择你的 Bot
输入描述文本
```

#### 设置关于信息

```
/setabouttext
选择你的 Bot
输入关于文本
```

#### 设置命令列表

```
/setcommands
选择你的 Bot
输入命令列表，例如：
start - 开始使用
help - 获取帮助
```

## 安全注意事项

### 1. 保护 Bot Token

- **不要分享**你的 Bot Token
- **不要提交**Token 到代码仓库
- **使用环境变量**存储 Token
- **定期更换**Token（如果需要）

### 2. 权限管理

- 只给 Bot 必要的权限
- 定期检查 Bot 的权限设置
- 监控 Bot 的使用情况

### 3. 用户隐私

- 遵守 Telegram 的隐私政策
- 只收集必要的用户信息
- 保护用户数据安全

## 常见问题

### Q: Bot Token 泄露了怎么办？

A: 立即联系 @BotFather，使用 `/revoke` 命令重新生成 Token

### Q: Mini App 无法打开

A: 检查 URL 配置、HTTPS 设置和域名可访问性

### Q: 如何删除 Bot？

A: 使用 `/deletebot` 命令，但此操作不可逆

### Q: 可以修改 Mini App 信息吗？

A: 目前 Telegram 不支持修改已创建的 Mini App 信息

### Q: 如何获取更多用户？

A: 通过社交媒体、群组分享等方式推广你的 Bot

## 最佳实践

1. **用户体验**

   - 设计简洁的界面
   - 提供清晰的使用说明
   - 响应速度快

2. **功能设计**

   - 专注于核心功能
   - 避免功能过于复杂
   - 提供必要的帮助信息

3. **维护更新**

   - 定期更新应用
   - 修复已知问题
   - 添加新功能

4. **用户反馈**
   - 收集用户反馈
   - 及时响应用户问题
   - 持续改进应用
