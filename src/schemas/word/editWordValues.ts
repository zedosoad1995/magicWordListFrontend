import { z } from "zod";

export const editWordValuesSchema = z.object({
  knowledge: z.number().min(1).max(5),
  relevance: z.number().min(1).max(5),
  isLearned: z.boolean(),
});

export type IEditWordValuesSchema = z.infer<typeof editWordValuesSchema>;
