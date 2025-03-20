import { RootProvider } from "fumadocs-ui/provider";
import { Analytics } from "@vercel/analytics/react";
import { inter, jetbrains } from "@/lib/fonts";
import { keywords } from "@rehooks/utils";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@rehooks/ui/styles";

export const metadata: Metadata = {
  metadataBase: new URL("https://rehooks.dev"),
  /** OpenGraph */
  openGraph: {
    siteName: "Rehooks",
    url: "https://rehooks.dev",
    locale: "en_US",
    images: "https://rehooks.dev/og.png",
    creators: ["@pyr33x"],
    description:
      "A CLI to scaffold your react custom hooks, with a focus on performance, reusability, and type-safety.",
  },
  twitter: {
    title: "Rehooks",
    card: "summary_large_image",
    creator: "@pyr33x",
    site: "https://rehooks.dev",
    images: "https://rehooks.dev/og.png",
    description:
      "A CLI to scaffold your react custom hooks, with a focus on performance, reusability, and type-safety.",
  },
  /** OpenGraph */

  /** PWA */
  applicationName: "Rehooks",
  appleWebApp: {
    statusBarStyle: "default",
    title: "Rehooks",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  formatDetection: {
    telephone: false,
  },
  /** PWA */

  title: {
    default: "Rehooks",
    template: "%s | Rehooks",
  },
  description:
    "A CLI to scaffold your react custom hooks, with a focus on performance, reusability, and type-safety.",
  creator: "Mehdi Parandak",
  authors: {
    url: "https://github.com/pyr33x",
    name: "Mehdi Parandak",
  },
  keywords: keywords,

  /** Icons  */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  /** Icons  */

  /** Robots */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE ?? undefined,
  },
  /** Robots */
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="dark:selection:text-fd-foreground antialiased [text-rendering:optimizeLegibility] selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-800">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
