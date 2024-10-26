import { type HomeLayoutProps } from "fumadocs-ui/home-layout";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: HomeLayoutProps = {
  githubUrl: "https://github.com/Pyr33x/rehooks",
  nav: {
    title: "Rehooks",
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
  ],
};
