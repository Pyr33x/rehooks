import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/fuma/source";
import type { ReactNode } from "react";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
