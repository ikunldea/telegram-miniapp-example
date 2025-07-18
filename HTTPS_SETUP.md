# HTTPS 配置指南

## 概述

Telegram Mini App 要求所有环境都使用 HTTPS，包括开发环境和生产环境。本文档详细说明如何配置 HTTPS。

## 开发环境 HTTPS 配置

### 使用 ngrok（推荐）

#### 1. 安装 ngrok

```bash
# 使用 npm 安装
npm install -g ngrok

# 或者从官网下载
# https://ngrok.com/download
```

#### 2. 启动开发服务器

```bash
# 启动 Next.js 开发服务器
pnpm dev
```

#### 3. 创建 HTTPS 隧道

```bash
# 在另一个终端窗口运行
ngrok http 3000
```

#### 4. 获取 HTTPS URL

ngrok 会显示类似以下信息：

```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       51ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
```

复制 `https://abc123.ngrok.io` 这个 HTTPS URL。

#### 5. 配置 Bot URL

1. 在 Telegram 中发送 `/setmenubutton` 给 @BotFather
2. 选择你的 Bot
3. 设置按钮文本：打开应用
4. 设置按钮 URL：你的 ngrok HTTPS URL

### 其他 HTTPS 隧道工具

#### 1. Cloudflare Tunnel

```bash
# 安装 cloudflared
npm install -g cloudflared

# 创建隧道
cloudflared tunnel --url http://localhost:3000
```

#### 2. LocalTunnel

```bash
# 安装 localtunnel
npm install -g localtunnel

# 创建隧道
lt --port 3000
```

## 生产环境 HTTPS 配置

### Vercel 部署（自动 HTTPS）

1. **推送代码到 GitHub**
2. **在 Vercel 中导入项目**
3. **Vercel 自动提供 HTTPS**
4. **获取 HTTPS 域名**：`https://your-app.vercel.app`

### 其他平台部署

#### 1. 使用 Let's Encrypt

```bash
# 安装 certbot
sudo apt-get install certbot

# 获取 SSL 证书
sudo certbot certonly --standalone -d your-domain.com

# 配置 Nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### 2. 使用 Cloudflare

1. **添加域名到 Cloudflare**
2. **设置 DNS 记录**
3. **启用 SSL/TLS 加密**
4. **配置页面规则**

## 配置步骤总结

### 开发环境

1. **启动开发服务器**：`pnpm dev`
2. **创建 HTTPS 隧道**：`ngrok http 3000`
3. **复制 HTTPS URL**
4. **配置 Bot URL**：发送 `/setmenubutton` 给 @BotFather
5. **测试 Mini App**

### 生产环境

1. **部署应用到支持 HTTPS 的平台**
2. **获取 HTTPS 域名**
3. **配置 Bot URL**：发送 `/setmenubutton` 给 @BotFather
4. **测试 Mini App**

## 常见问题

### Q: 为什么必须使用 HTTPS？

A: Telegram Mini App 出于安全考虑，要求所有环境都使用 HTTPS。这包括：

- 保护用户数据安全
- 防止中间人攻击
- 确保通信加密

### Q: ngrok 免费版有什么限制？

A: ngrok 免费版限制：

- 每次重启生成新的 URL
- 连接数限制
- 带宽限制
- 不支持自定义域名

### Q: 如何获得固定的 HTTPS URL？

A: 解决方案：

- 升级 ngrok 付费版
- 使用 Vercel 等平台部署
- 配置自己的域名和 SSL 证书

### Q: 本地开发时 ngrok URL 无法访问？

A: 检查：

- ngrok 是否正常运行
- 防火墙设置
- 本地服务器是否启动
- 端口是否正确

## 安全建议

### 1. 开发环境

- **使用 ngrok 付费版**获得更好的稳定性
- **定期更新 ngrok**到最新版本
- **不要在生产环境使用 ngrok**

### 2. 生产环境

- **使用可靠的托管平台**（如 Vercel、Netlify）
- **配置正确的 SSL 证书**
- **启用 HSTS 头**
- **定期更新 SSL 证书**

### 3. 通用建议

- **保护 Bot Token**安全
- **使用环境变量**存储敏感信息
- **定期检查 HTTPS 配置**
- **监控 SSL 证书过期时间**

## 测试 HTTPS 配置

### 1. 检查 SSL 证书

```bash
# 使用 openssl 检查
openssl s_client -connect your-domain.com:443 -servername your-domain.com
```

### 2. 在线工具

- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [Security Headers](https://securityheaders.com/)

### 3. 浏览器检查

- 查看地址栏的锁图标
- 检查开发者工具的 Security 标签
- 确认没有混合内容警告

## 故障排除

### 1. HTTPS 证书错误

**解决方案**：

- 检查证书是否有效
- 确认域名匹配
- 更新证书

### 2. 混合内容警告

**解决方案**：

- 确保所有资源使用 HTTPS
- 检查图片、脚本、样式表链接
- 使用相对路径

### 3. 重定向循环

**解决方案**：

- 检查重定向配置
- 确认 HTTPS 和 HTTP 重定向规则
- 测试重定向逻辑

## 最佳实践

1. **开发环境**：使用 ngrok 进行本地 HTTPS 测试
2. **生产环境**：使用可靠的托管平台
3. **监控**：定期检查 HTTPS 配置
4. **更新**：保持 SSL 证书和工具更新
5. **测试**：在不同设备和浏览器中测试
