export default defineEventHandler(async (event) => {
  if (!isAdminEnabled()) {
    throw createError({ statusCode: 404, statusMessage: "Admin overview disabled" });
  }

  if (isLoginLocked(event)) {
    throw createError({ statusCode: 429, statusMessage: "Too many failed attempts" });
  }

  const body = await readBody<{ password?: unknown }>(event).catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password || !checkAdminPassword(password)) {
    recordFailedLogin(event);
    // Slow down guessing
    await new Promise((resolve) => setTimeout(resolve, 500));
    throw createError({ statusCode: 401, statusMessage: "Invalid password" });
  }

  resetFailedLogins(event);
  const session = await getAdminSession(event);
  await session.update({ admin: true });

  return { success: true };
});
