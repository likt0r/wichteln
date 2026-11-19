import { count, desc, eq } from "drizzle-orm";
import { groups, members } from "../../../database/schema";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const rows = await db
    .select({
      id: groups.id,
      name: groups.name,
      status: groups.status,
      createdAt: groups.createdAt,
      memberCount: count(members.id),
    })
    .from(groups)
    .leftJoin(members, eq(members.groupId, groups.id))
    .groupBy(groups.id)
    .orderBy(desc(groups.createdAt))
    .all();

  return rows;
});
