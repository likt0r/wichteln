import { createHash, timingSafeEqual } from "node:crypto";
import type { H3Event } from "h3";

/**
 * Global admin overview, protected by the NUXT_ADMIN_PASSWORD env variable.
 * If the variable is not set, the admin overview is disabled entirely.
 */

type AdminSessionData = { admin?: boolean };

const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

// Brute-force protection: max failed logins per client within the window
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_WINDOW_MS = 15 * 60 * 1000;
const failedLogins = new Map<string, { count: number; firstAt: number }>();

function adminPassword(): string {
  return String(useRuntimeConfig().adminPassword || "");
}

export function isAdminEnabled(): boolean {
  return adminPassword().length > 0;
}

function sha256(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function sessionConfig(event: H3Event) {
  // Derived from the admin password (changing it logs everyone out) and the
  // app secret (so the cookie key is not derivable from the password alone).
  const secret = process.env.NUXT_APP_SECRET || "";
  return {
    name: "wichteln-admin",
    password: sha256(`wichteln-admin-session:${secret}:${adminPassword()}`).toString("hex"),
    maxAge: SESSION_MAX_AGE,
    cookie: {
      httpOnly: true,
      sameSite: "strict" as const,
      secure: getRequestProtocol(event) === "https",
      path: "/",
    },
  };
}

export function getAdminSession(event: H3Event) {
  return useSession<AdminSessionData>(event, sessionConfig(event));
}

export async function isAdminAuthenticated(event: H3Event): Promise<boolean> {
  if (!isAdminEnabled()) return false;
  const session = await getAdminSession(event);
  return session.data.admin === true;
}

export async function requireAdmin(event: H3Event): Promise<void> {
  if (!isAdminEnabled()) {
    throw createError({ statusCode: 404, statusMessage: "Admin overview disabled" });
  }
  if (!(await isAdminAuthenticated(event))) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
}

export function checkAdminPassword(input: string): boolean {
  // Compare hashes so the comparison is constant-time regardless of length
  return timingSafeEqual(sha256(input), sha256(adminPassword()));
}

function clientKey(event: H3Event): string {
  return getRequestIP(event, { xForwardedFor: true }) || "unknown";
}

export function isLoginLocked(event: H3Event): boolean {
  const entry = failedLogins.get(clientKey(event));
  if (!entry) return false;
  if (Date.now() - entry.firstAt > LOCK_WINDOW_MS) {
    failedLogins.delete(clientKey(event));
    return false;
  }
  return entry.count >= MAX_FAILED_ATTEMPTS;
}

export function recordFailedLogin(event: H3Event): void {
  const key = clientKey(event);
  const entry = failedLogins.get(key);
  if (!entry || Date.now() - entry.firstAt > LOCK_WINDOW_MS) {
    failedLogins.set(key, { count: 1, firstAt: Date.now() });
  } else {
    entry.count++;
  }
}

export function resetFailedLogins(event: H3Event): void {
  failedLogins.delete(clientKey(event));
}
