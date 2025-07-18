# JWT 配置指南

## 概述

本项目使用简单的 base64 编码生成 JWT 令牌，适用于开发和测试环境。对于生产环境，建议使用专业的 JWT 库。

## 推荐的 JWT 库

### 1. jsonwebtoken (Node.js)

```bash
pnpm add jsonwebtoken
pnpm add -D @types/jsonwebtoken
```

**使用示例**：

```typescript
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// 生成 token
const token = jwt.sign({ uid: userId, iat: Date.now() }, JWT_SECRET, {
  expiresIn: "7d",
});

// 验证 token
const decoded = jwt.verify(token, JWT_SECRET);
```

### 2. jose (通用)

```bash
pnpm add jose
```

**使用示例**：

```typescript
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

// 生成 token
const token = await new jose.SignJWT({ uid: userId })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("7d")
  .sign(JWT_SECRET);

// 验证 token
const { payload } = await jose.jwtVerify(token, JWT_SECRET);
```

## 更新 API 路由

### 使用 jsonwebtoken

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validate, parse } from "@telegram-apps/init-data-node";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initData } = body;

    if (!initData) {
      return NextResponse.json({ error: "缺少initData参数" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      return NextResponse.json({ error: "Bot Token未配置" }, { status: 500 });
    }

    // 验证启动参数
    try {
      validate(initData, botToken);
    } catch (error) {
      return NextResponse.json({ error: "启动参数验证失败" }, { status: 401 });
    }

    // 解析启动参数
    const parsedData = parse(initData);

    // 生成 JWT token
    const token = jwt.sign(
      {
        uid: parsedData.user?.id.toString() || "anonymous",
        user: parsedData.user,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 设置cookie
    const response = NextResponse.json({
      success: true,
      user: parsedData.user,
    });

    response.cookies.set("telegram_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7天
    });

    return response;
  } catch (error) {
    console.error("认证错误:", error);
    return NextResponse.json({ error: "认证失败" }, { status: 500 });
  }
}
```

## 环境变量配置

在 `.env.local` 文件中添加 JWT 密钥：

```env
# Telegram Bot Token
TELEGRAM_BOT_TOKEN=你的Bot Token

# JWT 密钥（生产环境必须设置）
JWT_SECRET=your-super-secret-jwt-key-here
```

## 安全建议

### 1. 密钥管理

- **使用强密钥**：至少 32 个字符的随机字符串
- **环境变量**：不要硬编码密钥
- **定期更换**：定期更新 JWT 密钥

### 2. Token 配置

- **过期时间**：设置合理的过期时间
- **刷新机制**：实现 token 刷新逻辑
- **撤销机制**：支持 token 撤销

### 3. 生产环境

```env
# 生产环境示例
JWT_SECRET=your-production-secret-key-here-make-it-long-and-random
```

## 验证 Token

### 中间件示例

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("telegram_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // 验证成功，继续处理请求
    return NextResponse.next();
  } catch (error) {
    // Token 无效，重定向到登录页
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/protected/:path*"],
};
```

## 迁移步骤

1. **安装 JWT 库**：

   ```bash
   pnpm add jsonwebtoken
   pnpm add -D @types/jsonwebtoken
   ```

2. **更新环境变量**：

   ```env
   JWT_SECRET=your-secret-key
   ```

3. **更新 API 路由**：

   - 替换 `createJWTToken` 函数
   - 使用专业的 JWT 库

4. **测试验证**：
   - 测试 token 生成
   - 测试 token 验证
   - 测试过期处理

## 注意事项

- **密钥安全**：确保 JWT_SECRET 的安全性
- **Token 大小**：JWT token 比 base64 编码更大
- **性能考虑**：JWT 验证比简单解码更消耗资源
- **向后兼容**：考虑现有 token 的迁移策略
