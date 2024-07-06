import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  wordsPerDay: z.number().min(1).max(100),
});

export type IRegisterSchema = z.infer<typeof registerSchema>;
