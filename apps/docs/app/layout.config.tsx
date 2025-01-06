import type { HomeLayoutProps } from "fumadocs-ui/layouts/home";
import { RehooksIcon } from "@rehooks/ui/icons";

export const baseOptions: HomeLayoutProps = {
  githubUrl: "https://github.com/Pyr33x/rehooks",
  nav: {
    title: (
      <div className="flex flex-row items-center justify-center gap-x-2">
        <RehooksIcon className="size-6" />
        <p className="font-sans text-lg">Rehooks</p>
      </div>
    ),
  },
  links: [
    {
      type: "menu",
      text: "Documentation",
      url: "/docs/cli",
      items: [
        {
          menu: {
            banner: (
              <div className="flex h-20 w-full items-center justify-center gap-x-1">
                <RehooksIcon className="size-8" />
                <h1 className="text-fd-foreground text-2xl font-bold">
                  Rehooks CLI
                </h1>
              </div>
            ),
          },
          icon: <RehooksIcon className="size-6" />,
          text: "Rehooks CLI",
          description:
            "Learn how does Rehooks works and interact with the Rehooks CLI.",
          url: "/docs/cli",
        },
        {
          menu: {
            banner: (
              <div className="flex h-20 w-full items-center justify-center gap-x-1">
                <RehooksIcon className="size-8" stroke="#2563eb" />
                <h1 className="text-fd-foreground text-2xl font-bold">
                  Rehooks API
                </h1>
              </div>
            ),
          },
          icon: <RehooksIcon className="size-6" stroke="#2563eb" />,
          text: "Rehooks API",
          description:
            "Explore the Rehooks API to get the details of the available hooks.",
          url: "/docs/api",
        },
      ],
    },
    {
      text: "Blog",
      url: "/blog",
    },
  ],
};
