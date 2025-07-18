import { NextRequest, NextResponse } from "next/server";
import { validate, parse } from "@telegram-apps/init-data-node";

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

    // 创建JWT token
    const jwtToken = await createJWTToken(
      parsedData.user?.id.toString() || "anonymous"
    );

    // 设置cookie
    const response = NextResponse.json({
      success: true,
      user: parsedData.user,
    });

    response.cookies.set("telegram_token", jwtToken, {
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

// 简化的JWT token生成函数
async function createJWTToken(uid: string): Promise<string> {
  // 创建一个简单的JWT格式token
  const payload = {
    uid,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7天过期
  };

  // 简单的base64编码（生产环境建议使用JWT库）
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}
