import * as z from "zod";

export const ProjectSummarySchema = z.object({
  "averageTaskDuration": z.number(),
  "client": z.string(),
  "memberCount": z.number(),
  "project": z.string(),
  "taskCount": z.number(),
  "totalHours": z.number(),
});
export type ProjectSummary = z.infer<typeof ProjectSummarySchema>;
