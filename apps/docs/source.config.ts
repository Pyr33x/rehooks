import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
  defineCollections,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const { docs, meta } = defineDocs();

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
  }),
});

export default defineConfig();
