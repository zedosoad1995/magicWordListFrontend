import { z } from "zod";

export const wordSchema = z.object({
  original: z.string().min(1),
  translation: z.string().min(1),
  knowledge: z.number().min(1).max(5),
  relevance: z.number().min(1).max(5),
  isLearned: z.boolean(),
});

export type IWordSchema = z.infer<typeof wordSchema>;
