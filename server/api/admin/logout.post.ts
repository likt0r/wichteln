export default defineEventHandler(async (event) => {
  if (isAdminEnabled()) {
    const session = await getAdminSession(event);
    await session.clear();
  }
  return { success: true };
});
