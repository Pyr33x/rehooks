import { z } from "zod";

const configSchema = z.object({
  directory: z.string(),
  forceOverwrite: z.boolean().default(false),
});

type RehooksConfig = z.infer<typeof configSchema>;

type Hook = Readonly<{
  id: number;
  title: string;
  description: string;
  content: string;
}>;

export type { RehooksConfig, Hook };
export { configSchema };
