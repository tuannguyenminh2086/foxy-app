import * as z from "zod";

export const UserSchema = z.object({
    "avatar": z.string(),
    "first_name": z.string(),
    "id": z.number(),
    "last_name": z.string(),
    "terminal_status": z.number(),
});


export type User = z.infer<typeof UserSchema>;
