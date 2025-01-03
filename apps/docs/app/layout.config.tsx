import {
  ChevronRight,
  Component,
  NpmIcon,
  RehooksIcon,
  Server,
} from "@rehooks/ui/icons";
import type { HomeLayoutProps } from "fumadocs-ui/layouts/home";
import type { LinkItemType } from "fumadocs-ui/layouts/links";
import { GITHUB_LINK, REHOOKS_NPM } from "@rehooks/utils";

export const linkItems: LinkItemType[] = [
  {
    text: "GitHub",
    url: GITHUB_LINK,
  },
  {
    text: "NPM",
    url: REHOOKS_NPM,
    icon: <NpmIcon />,
  },
];

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
      type: "menu",
      text: "Documentation",
      url: "/docs",
      items: [
        {
          icon: <ChevronRight />,
          text: "Getting Started",
          description: "Learn how to interact with the CLI.",
          url: "/docs/getting-started",
        },
        {
          icon: <Component />,
          text: "Hooks",
          description: "Explore the hooks available in Rehooks.",
          url: "/docs/hooks",
        },
        {
          icon: <Server />,
          text: "API Reference",
          description:
            "Learn how to use the API to get the details of the available hooks.",
          url: "/docs/api",
        },
      ],
    },
    ...linkItems,
  ],
};
