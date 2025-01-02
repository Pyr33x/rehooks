import type { HomeLayoutProps } from "fumadocs-ui/layouts/home";
import { GITHUB_LINK, REHOOKS_NPM } from "@rehooks/utils";

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
    {
      text: "GitHub",
      url: GITHUB_LINK,
    },
    {
      text: "NPM",
      url: REHOOKS_NPM,
    },
  ],
};
