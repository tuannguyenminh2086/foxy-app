import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TimelineItemSchema } from '~/lib/zod/schema';

const prisma = new PrismaClient();

// Extend dayjs with the UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default defineEventHandler(async(event) => {
  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const body = await readBody(event)
    const validate = TimelineItemSchema.safeParse(body)

    if (validate.success) {

        const { content, start, group, id } = validate.data
        const _resources_item = await prisma.resources_item.create({
          data: {
            content: content,
            start:  dayjs(start).format('YYYY-MM-DD HH:mm:ssZ'),
            group: group,
            iid: id,
            title: ''
          },
        })

        return { status: 'success', data: {..._resources_item} }

    }
    else {
      throw new Error("invalid");
    }

  }
  catch (error) {
    return { status: 'error', error };
  }
})

