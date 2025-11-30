import { eq } from 'drizzle-orm';
import { groups, members } from '../../../database/schema';
import { generateId } from '../../../utils/id';

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, 'id');
  const body = await readBody(event);
  const { name } = body;

  if (!groupId || !name) {
    throw createError({ statusCode: 400, statusMessage: 'Group ID and Name required' });
  }

  // Check group status
  const group = await db.select().from(groups).where(eq(groups.id, groupId)).get();
  if (!group) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }

  if (group.status !== 'open') {
    throw createError({ statusCode: 403, statusMessage: 'Group is already closed/drawn' });
  }

  const id = generateId();

  await db.insert(members).values({
    id,
    groupId,
    name,
    createdAt: new Date(),
  });

  return {
    id,
    name,
    groupId
  };
});

