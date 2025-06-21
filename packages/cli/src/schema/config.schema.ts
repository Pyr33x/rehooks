import { z } from "zod/v4";

const configSchema = z.object({
  directory: z.string(),
  forceOverwrite: z.boolean().default(false),
  case: z.literal(["kebab", "camel"]),
});

type RehooksConfig = z.infer<typeof configSchema>;

type Hook = Readonly<{
  id: number;
  title: string;
  description: string;
  content: string;
}>;

export type { Hook, RehooksConfig };
export { configSchema };
