import { z } from "zod";
import "dotenv/config";

const ServerSchema = z.object({
  PORT: z.string().refine((port) => parseInt(port) > 0, "Invalid port number"),
});

type Env = z.infer<typeof ServerSchema>;
export const ENV: Env = ServerSchema.parse(process.env);
