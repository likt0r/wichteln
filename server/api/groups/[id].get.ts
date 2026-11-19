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

  const rounds = isAdmin ? await roundLinks(group) : { previous: null, next: null };

  return {
    id: group.id,
    name: group.name,
    status: group.status,
    round: group.round,
    // Every person has gifted every other person in this series
    seriesComplete: isSeriesComplete(group.round, groupMembers.length),
    previousRound: rounds.previous,
    nextRound: rounds.next,
    isAdmin,
    members: groupMembers.map((m) => ({
      name: m.name,
      // Admin needs ID for links
      id: isAdmin ? m.id : undefined,
      hasDrawn: !!m.targetMemberId,
      // If admin, show who they are gifting (target id + name)
      targetId: isAdmin ? (m.targetMemberId ?? undefined) : undefined,
      target:
        isAdmin && m.targetMemberId
          ? memberMap.get(m.targetMemberId)
          : undefined,
    })),
  };
});
