import { eq } from "drizzle-orm";
import { groups, members } from "../../../database/schema";
import { generateId, generateToken } from "../../../utils/id";

/**
 * Starts the next round: a new, still open group with the same participants.
 * The admin can then remove people, add new ones or bring back former
 * participants before drawing. The draw avoids pairs of earlier rounds.
 * Allowed for the group admin (token) and the global admin.
 */
export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, "id");
  if (!groupId) throw createError({ statusCode: 400, statusMessage: "ID required" });

  const group = await db.select().from(groups).where(eq(groups.id, groupId)).get();
  if (!group) throw createError({ statusCode: 404, statusMessage: "Group not found" });

  if (!(await canManageGroup(event, group))) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  if (group.status !== "drawn") {
    throw createError({ statusCode: 400, statusMessage: "Group has not been drawn yet" });
  }

  const previousMembers = await db.select().from(members).where(eq(members.groupId, group.id)).all();

  const now = new Date();
  const next = {
    id: generateId(),
    adminToken: generateToken(),
    name: group.name,
    status: "open",
    createdAt: now,
    round: group.round + 1,
    previousGroupId: group.id,
    seriesId: seriesIdOf(group),
  };

  // The transaction callback is synchronous, so the existence check and the
  // inserts cannot interleave with a concurrent request (e.g. a double click)
  return db.transaction((tx) => {
    const existing = tx
      .select({ id: groups.id, adminToken: groups.adminToken, round: groups.round })
      .from(groups)
      .where(eq(groups.previousGroupId, group.id))
      .get();
    if (existing) return { ...existing, existing: true };

    tx.insert(groups).values(next).run();
    if (previousMembers.length > 0) {
      tx.insert(members)
        .values(
          previousMembers.map((m) => ({
            id: generateId(), // new secret link per round
            groupId: next.id,
            name: m.name,
            createdAt: now,
            personId: personIdOf(m),
          }))
        )
        .run();
    }
    return { id: next.id, adminToken: next.adminToken, round: next.round, existing: false };
  });
});
