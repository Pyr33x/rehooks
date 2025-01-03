import { z } from "zod";

export const HookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
});

export type InferredHooksSchema = z.infer<typeof HookSchema>;
