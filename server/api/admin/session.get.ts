export default defineEventHandler(async (event) => {
  return {
    enabled: isAdminEnabled(),
    authenticated: await isAdminAuthenticated(event),
  };
});
