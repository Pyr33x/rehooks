import { baseOptions } from "@/app/layout.config";
import { DocsLayout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { source } from "@/lib/fuma/source";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
