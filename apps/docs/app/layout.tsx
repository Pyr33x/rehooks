import { RootProvider } from "fumadocs-ui/provider";
import { Analytics } from "@vercel/analytics/react";
import { inter, jetbrains } from "./fonts";
import type { ReactNode } from "react";
import { meta } from "@rehooks/utils";
import type { Metadata } from "next";
import "@rehooks/ui/styles";

export const metadata = {
  ...meta,
} satisfies Metadata;

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="dark:selection:text-fd-foreground selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-800">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
