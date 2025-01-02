import type { HomeLayoutProps } from "fumadocs-ui/layouts/home";
import { GITHUB_LINK, REHOOKS_NPM } from "@rehooks/utils";
import { RehooksIcon } from "@rehooks/ui/icons";

export const baseOptions: HomeLayoutProps = {
  githubUrl: "https://github.com/Pyr33x/rehooks",
  nav: {
    title: (
      <div className="flex flex-row items-center justify-center gap-x-2">
        <RehooksIcon className="size-5" />
        <p className="font-sans text-lg">Rehooks</p>
      </div>
    ),
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
