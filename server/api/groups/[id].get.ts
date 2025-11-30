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

  return {
    id: group.id,
    name: group.name,
    status: group.status,
    isAdmin,
    members: groupMembers.map((m) => ({
      name: m.name,
      // Nur ID zurückgeben wenn Admin oder der User selbst (aber hier ist es die Gruppenansicht)
      // Admin braucht die ID, um die Links zu kopieren und zu verteilen.
      id: isAdmin ? m.id : undefined,
      hasDrawn: !!m.targetMemberId,
    })),
  };
});
