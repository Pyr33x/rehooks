import { JetBrains_Mono } from "next/font/google";
import { Inter } from "next/font/google";

export const jetbrains = JetBrains_Mono({
  fallback: [
    "-apple-system",
    "monospace",
    "Consolas",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
  ],
  adjustFontFallback: true,
  subsets: ["latin"],
  preload: true,
  variable: "--font-mono",
});

export const inter = Inter({
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
  ],
  adjustFontFallback: true,
  subsets: ["latin"],
  preload: true,
  variable: "--font-sans",
});
