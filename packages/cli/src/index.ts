#!/usr/bin/env node

import { Command } from "commander";

import { add } from "~/commands/add";
import { init } from "~/commands/init";
import { getPackageInfo } from "~/utils/package";

async function main() {
  const packageInfo = await getPackageInfo();
  const program = new Command()
    .name("rehooks")
    .description(
      "A CLI to scaffold your react custom hooks, with a focus on performance, reusability, and type-safety.",
    )
    .version(
      packageInfo.version ?? "4.2.2",
      "-v, --version",
      "Displays the current version of the CLI",
    );
  program.addCommand(init);
  program.addCommand(add);
  program.parse();
}

main();
