import { and, eq } from "drizzle-orm";
import { groups, members } from "../../../../database/schema";

/** Removes a participant from an open group (group admin or global admin) */
export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, "id");
  const memberId = getRouterParam(event, "memberId");
  if (!groupId || !memberId) throw createError({ statusCode: 400, statusMessage: "ID required" });

  const group = await db.select().from(groups).where(eq(groups.id, groupId)).get();
  if (!group) throw createError({ statusCode: 404, statusMessage: "Group not found" });
  if (!(await canManageGroup(event, group))) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  // Once drawn, removing someone would leave a person without a giver
  if (group.status !== "open") {
    throw createError({ statusCode: 403, statusMessage: "Group is already closed/drawn" });
  }

  const deleted = await db
    .delete(members)
    .where(and(eq(members.id, memberId), eq(members.groupId, groupId)))
    .returning({ id: members.id })
    .all();
  if (deleted.length === 0) throw createError({ statusCode: 404, statusMessage: "Member not found" });

  return { success: true };
});
