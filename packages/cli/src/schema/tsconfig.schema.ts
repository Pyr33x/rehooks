import { z } from "zod";

const tsConfigSchema = z.object({
  compilerOptions: z
    .object({
      baseUrl: z.string().optional(),
    })
    .optional(),
});

type TsConfig = z.infer<typeof tsConfigSchema>;

export type { TsConfig };
export { tsConfigSchema };
