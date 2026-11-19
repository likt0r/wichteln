import { eq } from "drizzle-orm";
import { groups, members } from "../../../../database/schema";
import { generateId } from "../../../../utils/id";

/**
 * Adds a participant to an open group.
 * Body: { name } for a new person, or { personId } to bring
 * back someone from an earlier round of the series, keeping their history
 * (group admin or global admin).
 */
export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, "id");
  const body = await readBody<{ name?: unknown; personId?: unknown }>(event).catch(() => null);

  if (!groupId) throw createError({ statusCode: 400, statusMessage: "Group ID required" });

  const group = await db.select().from(groups).where(eq(groups.id, groupId)).get();
  if (!group) throw createError({ statusCode: 404, statusMessage: "Group not found" });

  if (group.status !== "open") {
    throw createError({ statusCode: 403, statusMessage: "Group is already closed/drawn" });
  }

  let name = typeof body?.name === "string" ? body.name.trim() : "";
  let personId: string | null = null;

  if (typeof body?.personId === "string") {
    if (!(await canManageGroup(event, group))) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    const roundMembers = await db.select().from(members).where(eq(members.groupId, groupId)).all();
    const former = (await formerParticipants(group, roundMembers)).find(
      (p) => p.personId === body.personId
    );
    if (!former) {
      throw createError({ statusCode: 400, statusMessage: "Not a former participant of this series" });
    }
    personId = former.personId;
    name = former.name;
  }

  if (!name) throw createError({ statusCode: 400, statusMessage: "Name required" });

  const id = generateId();
  await db.insert(members).values({ id, groupId, name, personId, createdAt: new Date() });

  return { id, name, groupId };
});
