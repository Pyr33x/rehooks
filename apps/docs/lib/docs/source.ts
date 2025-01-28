import { createOpenAPI, attachFile } from "fumadocs-openapi/server";
import { docs, meta, blogPosts } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { icons } from "@rehooks/ui/icons";
import { createElement } from "react";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  pageTree: {
    attachFile,
  },
});

export const blog = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts, meta),
});

export const openapi = createOpenAPI({
  proxyUrl: "/api/proxy",
});
