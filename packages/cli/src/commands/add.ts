import {
  confirm,
  intro,
  log,
  multiselect,
  spinner,
  outro,
} from "@clack/prompts";
import type { Hook } from "~/schema/config.schema";
import { BASE_URL } from "~/utils/constants";
import { cyan, green, red } from "colorette";
import { getConfig } from "~/utils/config";
import { Command } from "commander";
import axios from "axios";
import path from "path";
import fs from "fs";

export const add = new Command()
  .name("add")
  .description("Add hooks to your project")
  .argument("[hooks...]", "Specify one or more hook names to add")
  .option("-f, --force", "Force overwrite existing hook files without prompt")
  .action(async (hooks, options) => {
    intro("Adding hooks...");

    // Check if project has rehooks.json
    const config = await getConfig(process.cwd());
    if (!config) {
      outro(red("Rehooks configuration not found or invalid."));
      return;
    }

    // Get properties from rehooks.json
    const { directory, forceOverwrite } = config;
    const shouldForceOverwrite = options.force || forceOverwrite;

    // Adding hooks
    const addedHooks: string[] = [];
    try {
      if (hooks.length > 0) {
        for (const hook of hooks) {
          const hookFilePath = path.join(directory, `${hook}.ts`);

          if (fs.existsSync(hookFilePath) && !shouldForceOverwrite) {
            const overwrite = await confirm({
              message: `${hook}.ts already exists. Do you want to overwrite it?`,
              initialValue: false,
            });

            if (!overwrite) {
              log.info(`Skipping ${cyan(hook)}.`);
              continue;
            }
          }

          const selectedHookResponse = await axios.get<Hook>(
            `${BASE_URL}/hooks/${hook}`,
          );

          let { content } = selectedHookResponse.data;
          fs.writeFileSync(hookFilePath, content);
          addedHooks.push(hook);
        }

        outro(
          green(
            `Successfully added ${cyan(addedHooks.map((h) => h.toString()).join(", "))}.`,
          ),
        );

        return;
      }

      const fetchSpinner = spinner();
      fetchSpinner.start("Fetching hooks...");
      const res = await axios.get<Hook[]>(`${BASE_URL}/hooks`);
      const hooksData = res.data;
      fetchSpinner.stop("Done.");

      const selectedHooks = await multiselect({
        message: "Pick hooks to add:",
        options: hooksData.map((h: { title: string }) => ({
          value: h.title,
          label: h.title,
        })),
        required: true,
      });

      const selectedHookArray = selectedHooks as string[];

      log.success(
        `Selected ${selectedHookArray.length.toString()} ${selectedHookArray.length > 1 ? "hooks" : "hook"}.`,
      );

      log.info(`Hooks Directory: ${directory}`);

      for (const hook of selectedHookArray) {
        const hookFilePath = path.join(directory, `${hook}.ts`);

        if (fs.existsSync(hookFilePath) && !shouldForceOverwrite) {
          const overwrite = await confirm({
            message: `${hook}.ts already exists. Do you want to overwrite it?`,
            initialValue: false,
          });

          if (!overwrite) {
            log.info(`Skipping ${cyan(hook)}.`);
            continue;
          }
        }

        const selectedHookResponse = await axios.get(
          `${BASE_URL}/hooks/${hook}`,
        );
        let { content } = selectedHookResponse.data;
        fs.writeFileSync(hookFilePath, content);

        addedHooks.push(hook);
      }

      if (addedHooks.length > 0) {
        outro(
          green(
            `Successfully added ${cyan(addedHooks.map((h) => h.toString()).join(", "))}.`,
          ),
        );
      } else {
        outro(red("No hooks were added."));
      }
    } catch (error) {
      log.error(`Error adding hooks: ${error}`);
    }
  });
