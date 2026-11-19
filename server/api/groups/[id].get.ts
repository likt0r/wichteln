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

  // Admin only: in which earlier round a drawn pair already occurred, and who
  // took part earlier but is missing in this round
  const lastGifted = isAdmin
    ? lastGiftedIn(groupMembers, await seriesHistory(seriesIdOf(group), group.round - 1))
    : () => undefined;
  const former =
    isAdmin && group.status === "open" ? await formerParticipants(group, groupMembers) : [];

  return {
    id: group.id,
    name: group.name,
    status: group.status,
    round: group.round,
    formerParticipants: former,
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
      // Round in which this giver → receiver pair was already drawn (admin)
      repeatOfRound: m.targetMemberId ? lastGifted(m.id, m.targetMemberId) : undefined,
    })),
  };
});
