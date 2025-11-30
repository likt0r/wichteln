import { eq } from "drizzle-orm";
import { groups, members } from "../../database/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const token =
    getHeader(event, "Authorization")?.replace("Bearer ", "") ||
    getQuery(event).token;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID required" });
  }

  const group = await db.select().from(groups).where(eq(groups.id, id)).get();

  if (!group) {
    throw createError({ statusCode: 404, statusMessage: "Group not found" });
  }

  const isAdmin = group.adminToken === token;

  const groupMembers = await db
    .select()
    .from(members)
    .where(eq(members.groupId, id))
    .all();

  // Create a map for quick name lookup if admin needs to see targets
  const memberMap = new Map();
  if (isAdmin) {
    groupMembers.forEach((m) => memberMap.set(m.id, m.name));
  }

  return {
    id: group.id,
    name: group.name,
    status: group.status,
    isAdmin,
    members: groupMembers.map((m) => ({
      name: m.name,
      // Admin needs ID for links
      id: isAdmin ? m.id : undefined,
      hasDrawn: !!m.targetMemberId,
      // If admin, show who they are gifting (target name)
      target:
        isAdmin && m.targetMemberId
          ? memberMap.get(m.targetMemberId)
          : undefined,
    })),
  };
});
