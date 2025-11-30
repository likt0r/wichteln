import { eq } from 'drizzle-orm';
import { groups, members } from '../../../database/schema';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, 'id');
  
  let token = getHeader(event, 'Authorization')?.replace('Bearer ', '');
  if (!token) {
      try {
        const body = await readBody(event);
        token = body?.token;
      } catch (e) {
        // ignore
      }
  }

  if (!groupId) throw createError({ statusCode: 400 });

  const group = await db.select().from(groups).where(eq(groups.id, groupId)).get();
  if (!group) throw createError({ statusCode: 404 });

  if (group.adminToken !== token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  if (group.status !== 'open') {
      throw createError({ statusCode: 400, statusMessage: 'Already drawn' });
  }

  const allMembers = await db.select().from(members).where(eq(members.groupId, groupId)).all();

  if (allMembers.length < 2) {
    throw createError({ statusCode: 400, statusMessage: 'Not enough members (min 2)' });
  }

  const memberIds = allMembers.map(m => m.id);
  const shuffledIds = shuffleArray(memberIds);
  
  const updates = [];
  for (let i = 0; i < shuffledIds.length; i++) {
    const giverId = shuffledIds[i];
    const receiverId = shuffledIds[(i + 1) % shuffledIds.length];
    
    updates.push(
      db.update(members)
        .set({ targetMemberId: receiverId })
        .where(eq(members.id, giverId))
    );
  }

  await Promise.all(updates);
  
  await db.update(groups).set({ status: 'drawn' }).where(eq(groups.id, groupId));

  return { success: true };
});
