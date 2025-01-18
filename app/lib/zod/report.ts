import * as z from "zod";

export const TaskReportSchema = z.object({
  "author": z.string(),
  "author_id": z.number(),
  "client": z.string(),
  "client_id": z.number(),
  "due_date": z.null(),
  "est_time": z.number(),
  "id": z.number(),
  "is_quick_record": z.number(),
  "member": z.string(),
  "name_de": z.string(),
  "project": z.string(),
  "project_id": z.number(),
  "state": z.number(),
  "status": z.string(),
  "sub_project": z.null(),
  "sub_project_id": z.null(),
  "tag_names": z.null(),
  "tags": z.null(),
  "task": z.string(),
  "task_id": z.number(),
  "total_spent": z.number(),
});
export type TaskReport = z.infer<typeof TaskReportSchema>;
