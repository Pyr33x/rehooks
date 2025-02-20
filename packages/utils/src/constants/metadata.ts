import { keywords } from "./keywords";
import type { Metadata } from "next";

export const meta = {
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
} satisfies Metadata;
