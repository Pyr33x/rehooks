"use client";

import { GithubIcon, ArrowRight } from "@rehooks/ui/icons";
import { Button, Shine, Shimmer } from "@rehooks/ui/components";
import { GITHUB_LINK } from "@rehooks/utils";
import { useClipboard } from "rehooks-ts";
import Link from "next/link";

export function Hero() {
  return (
    <>
      <div className="inline-flex">
        <h1 className="max-w-lg text-balance text-center text-4xl font-black lg:text-6xl">
          Streamline Your{" "}
          <Shimmer
            className="text-4xl font-black lg:text-6xl"
            text="React"
            color="#2563eb"
            midColor="#60a5fa"
          />{" "}
          Hooks
        </h1>
      </div>
      <p className="text-fd-muted-foreground mt-2 max-w-xs text-pretty text-center text-lg font-normal lg:max-w-xl lg:text-xl">
        A CLI to scaffold your react custom hooks, with a focus on performance,
        reusability, and type-safety.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-y-2.5">
        <Link href="/docs/cli" className="group outline-none ring-0">
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
          borderWidth={1}
          className="col-span-2"
          color={["#2563eb", "#3b82f6"]}
        >
          <CopyButton />
        </Shine>
      </div>
    </>
  );
}

function CopyButton() {
  const { copy, isCopied } = useClipboard();

  return (
    <Button
      className="w-full rounded-full border-[1px] font-mono"
      onClick={() => copy("npx rehooks-cli@latest init")}
      variant="outline"
    >
      {isCopied ? "Copied to Clipboard!" : "$ npx rehooks-cli@latest init"}
    </Button>
  );
}
