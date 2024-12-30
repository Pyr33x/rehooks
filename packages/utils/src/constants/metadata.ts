import { keywords } from "./keywords";
import type { Metadata } from "next";

export const meta = {
  metadataBase: new URL("https://rehooks.pyr33x.ir"),
  /** OpenGraph */
  openGraph: {
    siteName: "Rehooks",
    url: "https://rehooks.pyr33x.ir",
    locale: "en_US",
    images: "/og.png",
  },
  twitter: {
    title: "Rehooks",
    card: "summary_large_image",
    creator: "@pyr33x",
    site: "https://rehooks.pyr33x.ir",
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
  description: "A CLI to insert hooks directly to your project.",
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
  /** Robots */
} satisfies Metadata;
