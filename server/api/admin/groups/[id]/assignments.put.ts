import { eq } from "drizzle-orm";
import { groups, members } from "../../../../database/schema";

/**
 * Replaces the draw of a group. Body: { assignments: { [giverId]: receiverId } }
 * The assignments must cover every member exactly once as giver and as
 * receiver, and nobody may gift themselves. Repeating a pair from an earlier
 * round is allowed here (the admin decides; the UI shows a warning).
 */
export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID required" });

  const group = await db.select().from(groups).where(eq(groups.id, id)).get();
  if (!group) throw createError({ statusCode: 404, statusMessage: "Group not found" });
  if (group.status !== "drawn") {
    throw createError({ statusCode: 400, statusMessage: "Group has not been drawn yet" });
  }

  // Changing a round that already has a successor could repeat pairs of later rounds
  if ((await roundLinks(group)).next) {
    throw createError({ statusCode: 409, statusMessage: "A later round already exists" });
  }

  const body = await readBody<{ assignments?: unknown }>(event).catch(() => null);
  const assignments = body?.assignments;
  if (!assignments || typeof assignments !== "object" || Array.isArray(assignments)) {
    throw createError({ statusCode: 400, statusMessage: "assignments required" });
  }
  const entries = Object.entries(assignments as Record<string, unknown>);

  const groupMembers = await db.select().from(members).where(eq(members.groupId, id)).all();
  const memberIds = new Set(groupMembers.map((m) => m.id));

  const givers = new Set<string>();
  const receivers = new Set<string>();
  for (const [giver, receiver] of entries) {
    if (typeof receiver !== "string" || !memberIds.has(giver) || !memberIds.has(receiver)) {
      throw createError({ statusCode: 400, statusMessage: "Unknown member in assignments" });
    }
    if (giver === receiver) {
      throw createError({ statusCode: 400, statusMessage: "Nobody may gift themselves" });
    }
    givers.add(giver);
    receivers.add(receiver);
  }
  if (
    entries.length !== memberIds.size ||
    givers.size !== memberIds.size ||
    receivers.size !== memberIds.size
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Every member must give and receive exactly once",
    });
  }

  db.transaction((tx) => {
    for (const [giver, receiver] of entries) {
      tx.update(members)
        .set({ targetMemberId: receiver as string })
        .where(eq(members.id, giver))
        .run();
    }
  });

  return { success: true };
});
