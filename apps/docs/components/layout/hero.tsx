"use client";

import { ArrowRight, ArrowUpRight, GithubIcon } from "@rehooks/ui/icons";
import { Button, Shine, Shimmer } from "@rehooks/ui/components";
import { REHOOKS_NPM, GITHUB_LINK } from "@rehooks/utils";
import { useClipboard } from "rehooks-ts";
import { motion } from "motion/react";
import Link from "next/link";

export function Hero() {
  return (
    <>
      <div className="mb-6">
        <Badge
          icon={
            <ArrowUpRight className="size-3 transition-transform duration-100 group-hover:-translate-y-px group-hover:translate-x-px" />
          }
        >
          Rehooks v4.6 Released!
        </Badge>
      </div>
      <motion.div
        initial={{ translateY: 15, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        className="inline-flex"
      >
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
      </motion.div>
      <motion.p
        initial={{ translateY: 15, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        className="text-fd-muted-foreground mt-2 max-w-xs text-pretty text-center text-lg font-normal lg:max-w-xl lg:text-xl"
      >
        A CLI to scaffold your react custom hooks, with a focus on performance,
        reusability, and type-safety.
      </motion.p>
      <motion.div
        initial={{ translateY: 15, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        className="mt-5 grid grid-cols-2 gap-y-2.5"
      >
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
      </motion.div>
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

function Badge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <motion.a
      initial={{ translateY: -50, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      target="_blank"
      rel="noopener noreferrer"
      href={REHOOKS_NPM}
      className="divide-fd-border border-fd-border bg-fd-background hover:bg-fd-secondary/50 group flex items-center rounded-full border text-xs font-medium drop-shadow-sm backdrop-blur-sm transition-colors duration-75 sm:divide-x"
    >
      <span className="text-fd-foreground py-1.5 pl-4 text-sm sm:pr-2.5">
        {children}
      </span>
      <div className="text-fd-muted-foreground flex items-center gap-1.5 p-1.5 pl-2.5">
        <span className="hidden text-sm sm:block">Read more</span>
        <div className="rounded-full bg-blue-600 p-1 text-white">{icon}</div>
      </div>
    </motion.a>
  );
}
