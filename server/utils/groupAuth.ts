import type { H3Event } from "h3";

/** Whether the request carries the group's admin token (Authorization: Bearer <token>) */
export function isGroupAdmin(event: H3Event, group: { adminToken: string }): boolean {
  const token = getHeader(event, "Authorization")?.replace("Bearer ", "");
  return !!token && token === group.adminToken;
}

/** Group admin (token) or the logged-in global admin may manage a group */
export async function canManageGroup(
  event: H3Event,
  group: { adminToken: string }
): Promise<boolean> {
  return isGroupAdmin(event, group) || (await isAdminAuthenticated(event));
}
