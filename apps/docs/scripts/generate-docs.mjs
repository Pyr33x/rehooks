import { generateFiles } from "fumadocs-openapi";
import { rimrafSync } from "rimraf";

const out = "./content/docs/api-reference";

rimrafSync(out, {
  filter(v) {
    return !v.endsWith("index.mdx") && !v.endsWith("meta.json");
  },
});

void generateFiles({
  input: ["./rehooksapi.json"],
  output: out,
  groupBy: "tag",
});
