import { generateFiles } from "fumadocs-openapi";
import { rimrafSync } from "rimraf";

const out = "./content/docs/api/list";

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
