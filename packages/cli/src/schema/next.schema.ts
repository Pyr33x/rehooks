import { z } from "zod";

const Opts = z.object({
  server: z.string(),
  client: z.string(),
});

const nextSchema = z.object({
  id: z.number(),
  title: z.string(),
  descriotion: z.string(),
  content: Opts,
});

type Next = z.infer<typeof nextSchema>;

export type { Next };
export { nextSchema };
