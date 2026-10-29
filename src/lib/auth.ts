import crypto from "crypto";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "i9_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8; // 8 horas de sessão

function getAdminSecret(): string {
  // Chave derivada da senha administrativa + salt interno do servidor
  const basePass = process.env.ADMIN_PASSWORD || "I9Solution@Recife2026!";
  const secretSalt = process.env.ADMIN_SESSION_SECRET || "i9-solution-hmac-sha256-internal-key-2026";
  return crypto.createHash("sha256").update(`${basePass}:${secretSalt}`).digest("hex");
}

export function verifyAdminPassword(inputPassword: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || "I9Solution@Recife2026!";
  const inputBuf = Buffer.from(String(inputPassword || ""));
  const expectedBuf = Buffer.from(expectedPassword);

  if (inputBuf.length !== expectedBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(inputBuf, expectedBuf);
}

export function createAdminSessionToken(): string {
  const exp = Date.now() + SESSION_DURATION_MS;
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${exp}.${nonce}`;
  const signature = crypto
    .createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expStr, nonce, signature] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) {
    return false;
  }

  const payload = `${expStr}.${nonce}`;
  const expectedSig = crypto
    .createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("hex");

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;

  return crypto.timingSafeEqual(sigBuf, expectedBuf);
}

export function isRequestAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(cookie);
}

// Rate Limiter em memória por IP para prevenir força bruta e spam
interface RateRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateRecord>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown-ip";
}

