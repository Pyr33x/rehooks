import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/app/layout.config";
import { RehooksIcon, Server } from "@rehooks/ui/icons";
import { source } from "@/lib/fuma/source";
import type { ReactNode } from "react";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  sidebar: {
    tabs: [
      {
        title: "Rehooks CLI",
        icon: <RehooksIcon className="m-0 size-6 md:mb-7" />,
        description: "Learn how to interact with the Rehooks CLI.",
        url: "/docs/cli",
      },
      {
        title: "Rehooks API",
        icon: <RehooksIcon className="m-0 size-6 md:mb-7" stroke="#2563eb" />,
        description: "Explore the Rehooks API to get the available hooks.",
        url: "/docs/api",
      },
    ],
  },
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
