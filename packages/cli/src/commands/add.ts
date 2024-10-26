import { getConfig } from "~/utils/config";
import { logger } from "~/utils/logger";
import { Command } from "commander";
import inquirer from "inquirer";
import axios from "axios";
import path from "path";
import ora from "ora";
import fs from "fs";

export const add = new Command()
  .name("add")
  .description("Add custom hooks to your codebase")
  .action(async () => {
    const config = await getConfig(process.cwd());

    if (!config) {
      logger.error("rehooks.json not found or invalid configuration.");
      return;
    }

    try {
      const fetchSpinner = ora("Fetching hooks...").start();
      const response = await axios.get("https://rehooks.pyr33x.ir/api/hooks");
      const hooks = response.data;
      fetchSpinner.succeed("Fetched hooks.");

      const { selectedHooks } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "selectedHooks",
          message: "Select hooks to add:",
          choices: hooks.map((h: { title: string }) => h.title),
        },
      ]);
      const spinner = ora("Checking configuration...").start();
      spinner.succeed("Checked configuration.");

      spinner.succeed(
        `Created ${selectedHooks.length} ${selectedHooks.length > 1 ? "files" : "file"}.`,
      );
      for (const hook of selectedHooks) {
        const hookFilePath = path.join(config.directory, `${hook}.ts`);

        if (fs.existsSync(hookFilePath)) {
          const { overwrite } = await inquirer.prompt([
            {
              type: "confirm",
              name: "overwrite",
              message: `${hook}.ts already exists. Do you want to overwrite it?`,
              default: false,
            },
          ]);

          if (!overwrite) {
            logger.info(`Skipping ${hook}.ts.`);
            continue;
          }
        }

        const selectedHookResponse = await axios.get(
          `https://rehooks.pyr33x.ir/api/hooks/${hook}`,
        );
        let { content } = selectedHookResponse.data;
        fs.writeFileSync(hookFilePath, content);
        logger.info(` - ${hookFilePath}.`);
      }
    } catch (error) {
      logger.error(`Error adding hooks: ${error}`);
    }
  });
