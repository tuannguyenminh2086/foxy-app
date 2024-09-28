import { z } from 'zod';

const TimelineItemSchema = z.object({
  id: z.string().min(5, ''),
  content: z.string().optional(),
  start: z.string(),
  group: z.string().optional()
});


export { TimelineItemSchema }