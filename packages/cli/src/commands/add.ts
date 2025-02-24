import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  multiselect,
  outro,
  select,
} from "@clack/prompts";
import axios from "axios";
import { cyan, green, red } from "colorette";
import { Command } from "commander";
import { existsSync, writeFileSync } from "fs";
import { join } from "path";

import { getConfig } from "~/utils/config";
import { BASE_URL } from "~/utils/constants";
import { reactSchema } from "~/schema/react.schema";
import { nextSchema } from "~/schema/next.schema";

const fetchHookContent = async (
  hook: string,
  currentURL: string,
  options: { next?: boolean },
): Promise<string> => {
  const selectedHookResponse = await axios.get(`${currentURL}/${hook}`);

  if (isCancel(selectedHookResponse)) {
    cancel(red("Operation Cancelled."));
    process.exit(0);
  }

  let content: string;

  if (options.next) {
    // Validate the response against the Next schema
    const parsed = nextSchema.safeParse(selectedHookResponse.data);
    if (!parsed.success) {
      throw new Error(`Invalid Next hook structure: ${parsed.error}`);
    }

    const codeType = await select({
      message: "Choose the type of code for this hook:",
      options: [
        { value: "server", label: "Server" },
        { value: "client", label: "Client" },
      ],
      initialValue: "client",
    });

    if (isCancel(codeType)) {
      cancel(red("Operation Cancelled."));
      process.exit(0);
    }

    content = parsed.data.content[codeType as keyof typeof parsed.data.content];
  } else {
    // Validate the response against the React schema
    const parsed = reactSchema.safeParse(selectedHookResponse.data);
    if (!parsed.success) {
      throw new Error(`Invalid React hook structure: ${parsed.error}`);
    }

    content = parsed.data.content; // This should be a string
  }

  return content;
};

const handleHookFile = async (
  hook: string,
  hookFilePath: string,
  currentURL: string,
  options: { next?: boolean },
  shouldForceOverwrite: boolean,
): Promise<boolean> => {
  if (existsSync(hookFilePath) && !shouldForceOverwrite) {
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
      return false; // Skip adding this hook
    }
  }

  const content = await fetchHookContent(hook, currentURL, options);
  writeFileSync(hookFilePath, content);
  return true; // Successfully added the hook
};

export const add = new Command()
  .name("add")
  .description("Add hooks to your project")
  .argument("[hooks...]", "Specify one or more hook names to add")
  .option("-n, --next", "Add Next.js compatible reusable hooks")
  .option("-f, --force", "Force overwrite existing hook files without prompt")
  .action(
    async (hooks: string[], options: { next?: boolean; force?: boolean }) => {
      intro("Adding hooks...");

      const config = await getConfig(process.cwd());
      if (!config) {
        outro(red("Rehooks configuration not found or invalid."));
        return;
      }

      if (isCancel(config)) {
        cancel(red("Operation Cancelled."));
        process.exit(0);
      }

      const {
        directory,
        forceOverwrite,
      }: { directory: string; forceOverwrite: boolean } = config;
      const shouldForceOverwrite = options.force || forceOverwrite;
      const currentURL = options.next
        ? `${BASE_URL}/next`
        : `${BASE_URL}/react`;
      const addedHooks: string[] = [];

      try {
        if (hooks.length > 0) {
          for (const hook of hooks) {
            const hookFilePath = join(directory, `${hook}.ts`);
            const added = await handleHookFile(
              hook,
              hookFilePath,
              currentURL,
              options,
              shouldForceOverwrite,
            );
            if (added) addedHooks.push(hook);
          }
        } else {
          const res = await axios.get(`${currentURL}`);
          const hooksData = res.data; // Assuming this is an array of hooks
          const selectedHooks = (await multiselect({
            message: "Pick hooks to add:",
            options: hooksData.map((h: { title: string }) => ({
              value: h.title,
              label: h.title,
            })),
            required: true,
          })) as string[];

          if (isCancel(selectedHooks)) {
            cancel(red("Operation Cancelled."));
            process.exit(0);
          }

          for (const hook of selectedHooks) {
            const hookFilePath = join(directory, `${hook}.ts`);
            const added = await handleHookFile(
              hook,
              hookFilePath,
              currentURL,
              options,
              shouldForceOverwrite,
            );
            if (added) addedHooks.push(hook);
          }
        }

        if (addedHooks.length > 0) {
          outro(green(`Successfully added ${cyan(addedHooks.join(", "))}.`));
        } else {
          outro(red("No hooks were added."));
        }
      } catch (error) {
        outro(
          red(`Error adding hooks: make sure that ${cyan(directory)} exists`),
        );
      }
    },
  );
