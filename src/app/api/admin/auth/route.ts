import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  checkRateLimit,
  createAdminSessionToken,
  getClientIp,
  isRequestAuthenticated,
  verifyAdminPassword,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

// Verifica se a sessão atual do administrador é válida
export async function GET(request: NextRequest) {
  const authenticated = isRequestAuthenticated(request);
  if (!authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}

// Faz login e emite Cookie HttpOnly assinado
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    // Máximo de 5 tentativas de login a cada 15 minutos por IP
    const rate = checkRateLimit(`admin-login:${ip}`, 5, 1000 * 60 * 15);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Muitas tentativas de acesso. Aguarde ${rate.retryAfterSeconds} segundos e tente novamente.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Credenciais inválidas. Acesso negado." },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken();
    const response = NextResponse.json({
      success: true,
      message: "Autenticação realizada com sucesso.",
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 horas
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Requisição inválida." },
      { status: 400 }
    );
  }
}

// Encerra a sessão (Logout) limpando o Cookie HttpOnly
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

