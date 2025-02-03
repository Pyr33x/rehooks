import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import type { ReactNode } from "react";

export default function SlugLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.ReactElement {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
