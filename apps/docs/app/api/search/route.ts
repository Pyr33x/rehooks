import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/fuma/source";

export const { GET } = createFromSource(source);
