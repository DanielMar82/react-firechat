import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email()),
});
