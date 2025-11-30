import { groups } from '../../database/schema';
import { generateId, generateToken } from '../../utils/id';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name } = body;

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required',
    });
  }

  const id = generateId();
  const adminToken = generateToken();

  await db.insert(groups).values({
    id,
    adminToken,
    name,
    createdAt: new Date(),
  });

  return {
    id,
    adminToken,
    name,
  };
});

