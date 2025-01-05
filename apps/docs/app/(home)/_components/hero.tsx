"use client";

import { GithubIcon, ArrowRight } from "@rehooks/ui/icons";
import { Button, Shine } from "@rehooks/ui/components";
import { GITHUB_LINK } from "@rehooks/utils";
import { useClipboard } from "rehooks-ts";
import Link from "next/link";

export function Hero() {
  const { copy, isCopied } = useClipboard();

  return (
    <>
      <h1 className="max-w-lg text-balance bg-gradient-to-t from-black to-black bg-clip-text text-center text-4xl font-black text-transparent lg:text-6xl dark:from-blue-200 dark:from-75% dark:to-blue-100">
        Streamline Your{" "}
        <span className="animate-background-shine inline-flex transform bg-[linear-gradient(110deg,#2563eb,45%,#3b82f6,55%,#2563eb)] bg-[length:250%_100%] bg-clip-text text-transparent">
          React
        </span>{" "}
        Hooks
      </h1>
      <p className="text-fd-muted-foreground mt-2 max-w-2xl text-balance text-center text-lg font-normal lg:text-2xl">
        Avoid repetitive hook patterns, a source for making your own hooks.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-y-2.5">
        <Link href="/docs" className="group outline-none ring-0">
          <Button className="group rounded-full">
            <ArrowRight className="size-6 transform transition duration-300 group-hover:translate-x-0.5" />
            Get Started
          </Button>
        </Link>
        <a
          href={GITHUB_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group outline-none ring-0"
        >
          <Button variant="outline" className="group -ml-1.5 rounded-full">
            Star on Github
            <GithubIcon className="size-6 transform transition duration-300 group-hover:rotate-[360deg]" />
          </Button>
        </a>
        <Shine
          borderRadius={9999}
          borderWidth={1.5}
          className="col-span-2"
          color={["#2563eb", "#3b82f6"]}
        >
          <Button
            className="w-full rounded-full border-[1.5px] font-mono"
            onClick={() => copy("npx rehooks-cli@latest init")}
            variant="outline"
          >
            {isCopied
              ? "Copied to Clipboard!"
              : "$ npx rehooks-cli@latest init"}
          </Button>
        </Shine>
      </div>
    </>
  );
}
