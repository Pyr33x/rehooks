import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/app/layout.config";
import { RehooksIcon } from "@rehooks/ui/icons";
import { source } from "@/lib/docs/source";
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
      {
        title: "Rehooks Blog",
        icon: <RehooksIcon className="m-0 size-6 md:mb-7" stroke="#8b5cf6" />,
        description: "Read the latest news and updates from Rehooks.",
        url: "/blog",
      },
    ],
  },
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
