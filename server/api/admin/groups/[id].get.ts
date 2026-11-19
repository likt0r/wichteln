import { asc, eq } from "drizzle-orm";
import { groups, members } from "../../../database/schema";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID required" });

  const group = await db.select().from(groups).where(eq(groups.id, id)).get();
  if (!group) throw createError({ statusCode: 404, statusMessage: "Group not found" });

  const groupMembers = await db
    .select()
    .from(members)
    .where(eq(members.groupId, id))
    .orderBy(asc(members.createdAt))
    .all();

  const nameById = new Map(groupMembers.map((m) => [m.id, m.name]));

  return {
    id: group.id,
    name: group.name,
    status: group.status,
    createdAt: group.createdAt,
    adminToken: group.adminToken,
    members: groupMembers.map((m) => ({
      id: m.id,
      name: m.name,
      createdAt: m.createdAt,
      targetId: m.targetMemberId ?? undefined,
      target: m.targetMemberId ? nameById.get(m.targetMemberId) : undefined,
    })),
  };
});
