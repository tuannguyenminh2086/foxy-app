import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {
  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const _resources_items = await prisma.resources_item.findMany()
    return { status: 'success', data: _resources_items }
  }
  catch (error) {
    return { status: 'error', error };
  }
})

