import { eq } from "drizzle-orm";
import { groups, members } from "../../../database/schema";
import { generateId, generateToken } from "../../../utils/id";

/**
 * Starts the next round: a new group with the same participants, drawn right
 * away so that nobody gifts a person they already gifted in an earlier round
 * of the series. Allowed for the group admin (token) and the global admin.
 */
export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, "id");
  if (!groupId) throw createError({ statusCode: 400, statusMessage: "ID required" });

  const group = await db.select().from(groups).where(eq(groups.id, groupId)).get();
  if (!group) throw createError({ statusCode: 404, statusMessage: "Group not found" });

  const token = getHeader(event, "Authorization")?.replace("Bearer ", "");
  if (group.adminToken !== token && !(await isAdminAuthenticated(event))) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  if (group.status !== "drawn") {
    throw createError({ statusCode: 400, statusMessage: "Group has not been drawn yet" });
  }

  const existing = await db
    .select({ id: groups.id, adminToken: groups.adminToken, round: groups.round })
    .from(groups)
    .where(eq(groups.previousGroupId, group.id))
    .get();
  if (existing) return { ...existing, existing: true };

  const previousMembers = await db.select().from(members).where(eq(members.groupId, group.id)).all();

  // New members: same people, new (secret) ids
  const now = new Date();
  const newMembers = previousMembers.map((m) => ({
    id: generateId(),
    name: m.name,
    createdAt: now,
    personId: personIdOf(m),
  }));

  const earlierPairs = await seriesPairs(seriesIdOf(group), group.round);
  const assignments = drawAssignments(
    newMembers.map((m) => m.id),
    allowedByHistory(newMembers, earlierPairs)
  );
  if (!assignments) {
    throw createError({
      statusCode: 409,
      statusMessage: "Everyone has already gifted everyone",
    });
  }

  const next = {
    id: generateId(),
    adminToken: generateToken(),
    name: group.name,
    status: "drawn",
    createdAt: now,
    round: group.round + 1,
    previousGroupId: group.id,
    seriesId: seriesIdOf(group),
  };

  // The transaction callback is synchronous, so the existence check and the
  // inserts cannot interleave with a concurrent request (e.g. a double click)
  const result = db.transaction((tx) => {
    const raced = tx.select({ id: groups.id, adminToken: groups.adminToken, round: groups.round })
      .from(groups)
      .where(eq(groups.previousGroupId, group.id))
      .get();
    if (raced) return { ...raced, existing: true };

    tx.insert(groups).values(next).run();
    tx.insert(members)
      .values(newMembers.map((m) => ({ ...m, groupId: next.id, targetMemberId: assignments.get(m.id)! })))
      .run();
    return { id: next.id, adminToken: next.adminToken, round: next.round, existing: false };
  });

  return result;
});
