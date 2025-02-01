import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  outro,
  text,
} from "@clack/prompts";
import { bold, cyan, green, red, yellow } from "colorette";
import { Command } from "commander";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "fs";
import { resolve } from "path";

import { checkReactVersion } from "~/utils/checker";
import { getConfig, getTsConfig } from "~/utils/config";
import { DIR_PLACEHOLDER, SRC_DIR_PLACEHOLDER } from "~/utils/constants";

export const init = new Command()
  .name("init")
  .description("Initialize the Rehooks configuration")
  .argument("[path]", "Specify a custom path for the hooks directory")
  .option("-f, --force", "Force overwrite existing files without prompts")
  .option("-c, --config <path>", "Specify a custom path for rehooks.json")
  .action(async (customPath, options) => {
    intro("Initializing Rehooks...");

    // Check if project is compatible with Rehooks
    const isReactCompatible = checkReactVersion();
    if (!isReactCompatible) {
      outro(red("Initialization aborted due to React compatibility issues."));
      return;
    }

    if (isCancel(isReactCompatible)) {
      cancel(red("Operation Cancelled."));
      process.exit(0);
    }

    // Organize the configuration file
    const configPath = options.config
      ? resolve(process.cwd(), options.config)
      : resolve(process.cwd(), "rehooks.json");

    if (isCancel(configPath)) {
      cancel(red("Operation Cancelled."));
      process.exit(0);
    }

    if (existsSync(configPath) && statSync(configPath).isDirectory()) {
      log.error(red(`Error: ${configPath} is a directory, not a file.`));
      return;
    }

    let hooksDirExists = false;
    let currentDirectory: string | undefined;

    // Check if rehooks.json exists
    if (existsSync(configPath)) {
      log.warn(yellow("Rehooks configuration already exists."));
      const currentConfig = JSON.parse(readFileSync(configPath, "utf-8"));
      currentDirectory = currentConfig.directory;

      if (currentDirectory && currentDirectory === customPath) {
        log.warn(
          yellow(
            `The hooks directory is already configured as ${bold(currentDirectory)}.`,
          ),
        );
        return;
      }

      // Check if force overwrite is enabled
      if (options.force) {
        log.info(cyan("Forcing overwrite of rehooks.json..."));
      } else {
        const overwriteConfig = await confirm({
          message: bold(
            "Rehooks configuration already exists. Do you want to overwrite it?",
          ),
          initialValue: true,
        });
        if (!overwriteConfig) {
          outro(red("Initialization aborted."));
          return;
        }
        if (isCancel(overwriteConfig)) {
          cancel(red("Operation Cancelled."));
          process.exit(0);
        }
      }

      // Check if hooks directory exists
      if (currentDirectory && existsSync(currentDirectory)) {
        hooksDirExists = true;
        rmSync(currentDirectory, { recursive: true, force: true });
        log.info(
          green(
            `Previous hooks directory at ${bold(currentDirectory)} has been removed.`,
          ),
        );
      }
    }

    // Get directory path
    let directory = customPath || DIR_PLACEHOLDER;

    if (!customPath) {
      const hasSrc = await confirm({
        message: `Does your project have a ${bold(cyan("src"))} folder?`,
        initialValue: true,
      });

      if (isCancel(hasSrc)) {
        cancel(red("Operation Cancelled."));
        process.exit(0);
      }

      if (hasSrc) {
        directory = SRC_DIR_PLACEHOLDER;
      } else {
        const customDir = await text({
          message:
            "Where would you like to create the hooks directory? (e.g., 'hooks', 'src/hooks', 'custom/path')",
          placeholder: DIR_PLACEHOLDER,
        });

        if (isCancel(customDir)) {
          cancel(red("Operation Cancelled."));
          process.exit(0);
        }

        if (typeof customDir === "string" && customDir.trim()) {
          directory = customDir.trim();
        }
      }
    }

    // Write rehooks.json file
    log.info(cyan("Creating rehooks.json configuration file..."));
    const defaultConfig = { directory, forceOverwrite: false };

    try {
      writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      log.success(
        green(`Rehooks configuration file created at ${bold(configPath)}.`),
      );

      if (
        !hooksDirExists ||
        (hooksDirExists &&
          customPath !== currentDirectory &&
          directory !== currentDirectory)
      ) {
        log.info(cyan("Creating hooks directory..."));
        mkdirSync(directory, { recursive: true });
        log.success(green(`Hooks directory created at ${bold(directory)}.`));
      }
    } catch (error) {
      log.error("Error creating rehooks.json or hooks directory.");
      log.error(
        red(`Error creating rehooks.json or hooks directory: ${error}`),
      );
      return;
    }

    // Check if configuration file exists
    try {
      const config = await getConfig(process.cwd());
      log.success(green("Configuration loaded successfully."));

      if (!config) {
        log.warn(yellow("Configuration loaded, but may be incomplete."));
      }
    } catch (error) {
      log.error(red("Failed to load configuration."));
    }

    // Check if TypeScript configuration exists
    try {
      const tsConfig = await getTsConfig(process.cwd());
      log.success(green("TypeScript configuration loaded successfully."));

      if (!tsConfig) {
        log.warn(
          yellow("TypeScript configuration loaded, but may be incomplete."),
        );
      }
    } catch (error) {
      log.error(red("Failed to load TypeScript configuration."));
    }

    outro(green("Initialization complete!"));
  });
