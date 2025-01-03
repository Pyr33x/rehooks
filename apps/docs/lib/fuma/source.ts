import { createOpenAPI, attachFile } from "fumadocs-openapi/server";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { icons } from "@rehooks/ui/icons";
import { docs, meta } from "@/.source";
import { createElement } from "react";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
  icon(icon) {
    if (!icon) {
      return;
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
  pageTree: {
    attachFile,
  },
});

export const openapi = createOpenAPI({
  proxyUrl: "/api/proxy",
});
