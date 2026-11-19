import { eq } from "drizzle-orm";
import { groups, members } from "../../../database/schema";

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, "id");

  let token = getHeader(event, "Authorization")?.replace("Bearer ", "");
  let force = false;

  try {
    const body = await readBody(event);
    token = token || body?.token;
    force = body?.force === true;
  } catch {
    // ignore missing/invalid body
  }

  if (!groupId) throw createError({ statusCode: 400 });

  const group = await db.select().from(groups).where(eq(groups.id, groupId)).get();
  if (!group) throw createError({ statusCode: 404 });

  if (group.adminToken !== token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  // Allow redraw if force is true, otherwise check status
  if (group.status !== "open" && !force) {
    throw createError({ statusCode: 400, statusMessage: "Already drawn" });
  }

  // Changing a round that already has a successor could repeat pairs of later rounds
  if ((await roundLinks(group)).next) {
    throw createError({ statusCode: 409, statusMessage: "A later round already exists" });
  }

  const allMembers = await db.select().from(members).where(eq(members.groupId, groupId)).all();

  if (allMembers.length < 2) {
    throw createError({ statusCode: 400, statusMessage: "Not enough members (min 2)" });
  }

  // In a series of rounds, avoid pairs of earlier rounds; if that is not
  // possible, use as few repeats as possible (never self-assignments)
  const history = await seriesHistory(seriesIdOf(group), group.round - 1);
  const result = drawAssignments(
    allMembers.map((m) => m.id),
    lastGiftedIn(allMembers, history)
  );
  if (!result) {
    throw createError({ statusCode: 400, statusMessage: "Not enough members (min 2)" });
  }

  db.transaction((tx) => {
    for (const [giver, receiver] of result.assignments) {
      tx.update(members).set({ targetMemberId: receiver }).where(eq(members.id, giver)).run();
    }
    tx.update(groups).set({ status: "drawn" }).where(eq(groups.id, groupId)).run();
  });

  return { success: true, repeats: result.repeats };
});
