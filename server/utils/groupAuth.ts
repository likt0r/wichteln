import type { H3Event } from "h3";

/** Whether the request carries the group's admin token (Authorization: Bearer <token>) */
export function isGroupAdmin(event: H3Event, group: { adminToken: string }): boolean {
  const token = getHeader(event, "Authorization")?.replace("Bearer ", "");
  return !!token && token === group.adminToken;
}
