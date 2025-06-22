import { z } from "zod/v4";

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
