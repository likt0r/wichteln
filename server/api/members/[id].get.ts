import { eq } from 'drizzle-orm';
import { groups, members } from '../../database/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400 });

  const member = await db.select().from(members).where(eq(members.id, id)).get();
  if (!member) throw createError({ statusCode: 404, statusMessage: 'Member not found' });

  const group = await db.select().from(groups).where(eq(groups.id, member.groupId)).get();
  
  let target = null;
  if (member.targetMemberId) {
    target = await db.select().from(members).where(eq(members.id, member.targetMemberId)).get();
  }

  return {
    member: {
      id: member.id,
      name: member.name,
    },
    group: {
      id: group?.id,
      name: group?.name,
      status: group?.status,
    },
    target: target ? {
      name: target.name
    } : null
  };
});

