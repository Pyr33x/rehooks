import { green, red, cyan, bold } from "colorette";
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
  .description("Add hooks to your project")
  .action(async () => {
    const config = await getConfig(process.cwd());

    if (!config) {
      logger.error(red("rehooks.json not found or invalid configuration."));
      return;
    }

    try {
      const fetchSpinner = ora(cyan("Fetching hooks...")).start();
      const response = await axios.get("https://rehooks.pyr33x.ir/api/hooks");
      const hooks = response.data;
      fetchSpinner.succeed(green("Done."));

      const { selectedHooks } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "selectedHooks",
          message: bold("Select hooks to add:"),
          choices: hooks.map((h: { title: string }) => h.title),
        },
      ]);

      const spinner = ora(cyan("Checking configuration...")).start();
      spinner.succeed(green("Checked configuration."));

      spinner.succeed(
        green(
          `Created ${bold(selectedHooks.length.toString())} ${selectedHooks.length > 1 ? "files" : "file"}.`,
        ),
      );

      const indexFilePath = path.join(config.directory, "index.ts");

      for (const hook of selectedHooks) {
        const hookFilePath = path.join(config.directory, `${hook}.ts`);

        if (fs.existsSync(hookFilePath)) {
          const { overwrite } = await inquirer.prompt([
            {
              type: "confirm",
              name: "overwrite",
              message: bold(
                red(`${hook}.ts already exists. Do you want to overwrite it?`),
              ),
              default: false,
            },
          ]);

          if (!overwrite) {
            logger.info(cyan(`Skipping ${hook}.ts.`));
            continue;
          }
        }

        const selectedHookResponse = await axios.get(
          `https://rehooks.pyr33x.ir/api/hooks/${hook}`,
        );
        let { content } = selectedHookResponse.data;
        fs.writeFileSync(hookFilePath, content);
        logger.info(green(` - ${hookFilePath}.`));

        fs.appendFileSync(
          indexFilePath,
          `export { ${hook} } from "./${hook}";\n`,
        );
      }
    } catch (error) {
      logger.error(red(`Error adding hooks: ${error}`));
    }
  });
