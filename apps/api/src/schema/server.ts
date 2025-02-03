import { z } from "zod";
import "dotenv/config";

const EnvSchema = z.object({
  PORT: z
    .string()
    .refine(
      (port) => parseInt(port) > 0 && parseInt(port) < 2000,
      "Invalid port number",
    ),
});

type Env = z.infer<typeof EnvSchema>;
export const ENV: Env = EnvSchema.parse(process.env);
