import { asc, eq } from "drizzle-orm";
import { groups, members } from "../../../../database/schema";

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

  // Who already gifted whom in earlier rounds (pairs that must not repeat)
  const earlierPairs = await seriesPairs(seriesIdOf(group), group.round - 1);
  const rounds = await roundLinks(group);

  return {
    id: group.id,
    name: group.name,
    status: group.status,
    createdAt: group.createdAt,
    adminToken: group.adminToken,
    round: group.round,
    seriesComplete: isSeriesComplete(group.round, groupMembers.length),
    previousRoundId: rounds.previous?.id ?? null,
    nextRoundId: rounds.next?.id ?? null,
    earlierReceivers: earlierReceivers(groupMembers, earlierPairs),
    members: groupMembers.map((m) => ({
      id: m.id,
      name: m.name,
      createdAt: m.createdAt,
      targetId: m.targetMemberId ?? undefined,
      target: m.targetMemberId ? nameById.get(m.targetMemberId) : undefined,
    })),
  };
});
