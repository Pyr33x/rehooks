import { z } from "zod";

const reactSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
});

type React = z.infer<typeof reactSchema>;

export type { React };
export { reactSchema };
