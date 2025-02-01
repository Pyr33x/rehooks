import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  multiselect,
  outro,
  spinner,
} from "@clack/prompts";
import axios from "axios";
import { cyan, green, red } from "colorette";
import { Command } from "commander";
import { existsSync, writeFileSync } from "fs";
import { join } from "path";

import type { Hook } from "~/schema/config.schema";
import { getConfig } from "~/utils/config";
import { BASE_URL } from "~/utils/constants";

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

    if (isCancel(config)) {
      cancel(red("Operation Cancelled."));
      process.exit(0);
    }

    // Get properties from rehooks.json
    const { directory, forceOverwrite } = config;
    const shouldForceOverwrite = options.force || forceOverwrite;

    // Adding hooks
    const addedHooks: string[] = [];
    try {
      if (hooks.length > 0) {
        const addSpinner = spinner();
        addSpinner.start("Adding hooks...");

        for (const hook of hooks) {
          const hookFilePath = join(directory, `${hook}.ts`);

          if (existsSync(hookFilePath) && !shouldForceOverwrite) {
            // Stop the spinner before showing the prompt
            addSpinner.stop();

            const overwrite = await confirm({
              message: `${hook}.ts already exists. Do you want to overwrite it?`,
              initialValue: false,
            });

            if (isCancel(overwrite)) {
              cancel(red("Operation Cancelled."));
              process.exit(0);
            }

            if (!overwrite) {
              log.info(`Skipping ${cyan(hook)}.`);
              continue;
            }

            // Restart the spinner after the prompt is resolved
            addSpinner.start("Adding hooks...");
          }

          try {
            const selectedHookResponse = await axios.get<Hook>(
              `${BASE_URL}/hooks/${hook}`,
            );

            if (isCancel(selectedHookResponse)) {
              cancel(red("Operation Cancelled."));
              process.exit(0);
            }

            const { content } = selectedHookResponse.data;
            writeFileSync(hookFilePath, content);
            addedHooks.push(hook);
          } catch (error) {
            addSpinner.stop(red(`Failed to add ${hook}.`));
            throw error; // Re-throw the error to handle it in the outer catch block
          }
        }

        addSpinner.stop(green("Hooks added successfully!"));

        outro(
          green(
            `Successfully added ${cyan(addedHooks.map((h) => h.toString()).join(", "))}.`,
          ),
        );

        return;
      }

      // Fetch hooks if no specific hooks are provided
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

      if (isCancel(selectedHooks)) {
        cancel(red("Operation Cancelled."));
        process.exit(0);
      }

      const selectedHookArray = selectedHooks;

      log.success(
        `Selected ${selectedHookArray.length.toString()} ${selectedHookArray.length > 1 ? "hooks" : "hook"}.`,
      );

      log.info(`Hooks Directory: ${directory}`);

      // Writing hooks
      const addSpinner = spinner();

      for (const hook of selectedHookArray) {
        const hookFilePath = join(directory, `${hook}.ts`);

        if (existsSync(hookFilePath) && !shouldForceOverwrite) {
          // Stop the spinner before showing the prompt
          addSpinner.stop();

          const overwrite = await confirm({
            message: `${hook}.ts already exists. Do you want to overwrite it?`,
            initialValue: false,
          });

          if (isCancel(overwrite)) {
            cancel(red("Operation Cancelled."));
            process.exit(0);
          }

          if (!overwrite) {
            log.info(`Skipping ${cyan(hook)}.`);
            continue;
          }

          // Restart the spinner after the prompt is resolved
          addSpinner.start("Adding hooks...");
        }

        addSpinner.start(`Adding ${hook}...`);

        try {
          const selectedHookResponse = await axios.get(
            `${BASE_URL}/hooks/${hook}`,
          );

          if (isCancel(selectedHookResponse)) {
            cancel(red("Operation Cancelled."));
            process.exit(0);
          }

          const { content } = selectedHookResponse.data;
          writeFileSync(hookFilePath, content);
          addedHooks.push(hook);

          addSpinner.stop(green(`${hook} added successfully.`));
        } catch (error) {
          addSpinner.stop(red(`Failed to add ${hook}.`));
        }
      }

      addSpinner.stop(green("Hooks added successfully!"));

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
      outro(
        red(`Error adding hooks: make sure that ${cyan(directory)} exists`),
      );
    }
  });
