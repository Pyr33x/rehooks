import { intro, log, outro, confirm, text } from "@clack/prompts";
import { SRC_HOOKS_DIR, HOOKS_DIR } from "~/utils/constants";
import { green, red, cyan, bold, yellow } from "colorette";
import { getConfig } from "~/utils/config";
import { Command } from "commander";
import semver from "semver";
import path from "path";
import fs from "fs";

async function checkReactVersion() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    log.error(red("Error: package.json not found in the project directory."));
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const reactVersion =
    packageJson.dependencies?.react || packageJson.peerDependencies?.react;

  if (!reactVersion) {
    log.error(
      red(
        "React is not listed as a dependency or peer dependency in package.json.",
      ),
    );
    return false;
  }

  const cleanedVersion = semver.minVersion(reactVersion);
  if (!cleanedVersion || semver.lt(cleanedVersion, "18.0.0")) {
    log.error(
      red(
        `React version (${cleanedVersion || reactVersion}) is lower than 18. Please upgrade.`,
      ),
    );
    return false;
  }
  return true;
}

export const init = new Command()
  .name("init")
  .description("Initialize the Rehooks configuration")
  .argument("[path]", "Specify a custom path for the hooks directory")
  .option("-f, --force", "Force overwrite existing files without prompts")
  .option("-c, --config <path>", "Specify a custom path for rehooks.json")
  .action(async (customPath, options) => {
    intro("Initializing Rehooks...");

    const isReactCompatible = await checkReactVersion();
    if (!isReactCompatible) {
      outro(red("Initialization aborted due to React compatibility issues."));
      return;
    }

    const configPath = options.config
      ? path.resolve(process.cwd(), options.config)
      : path.resolve(process.cwd(), "rehooks.json");

    if (fs.existsSync(configPath) && fs.statSync(configPath).isDirectory()) {
      log.error(red(`Error: ${configPath} is a directory, not a file.`));
      return;
    }

    let hooksDirExists = false;
    let currentDirectory: string | undefined;

    if (fs.existsSync(configPath)) {
      log.warn(yellow("Rehooks configuration already exists."));
      const currentConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      currentDirectory = currentConfig.directory;

      if (currentDirectory && currentDirectory === customPath) {
        log.warn(
          yellow(
            `The hooks directory is already configured as ${bold(currentDirectory)}.`,
          ),
        );
        return;
      }

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
      }

      if (currentDirectory && fs.existsSync(currentDirectory)) {
        hooksDirExists = true;
        fs.rmSync(currentDirectory, { recursive: true, force: true });
        log.info(
          green(
            `Previous hooks directory at ${bold(currentDirectory)} has been removed.`,
          ),
        );
      }
    }

    let directory = customPath || HOOKS_DIR;

    if (!customPath) {
      const hasSrc = await confirm({
        message: `Does your project have a ${bold(cyan("src"))} folder?`,
        initialValue: true,
      });

      if (hasSrc) {
        directory = SRC_HOOKS_DIR;
      } else {
        const customDir = await text({
          message:
            "Where would you like to create the hooks directory? (e.g., 'hooks', 'src/hooks', 'custom/path')",
          placeholder: HOOKS_DIR,
        });

        if (typeof customDir === "string" && customDir.trim()) {
          directory = customDir.trim();
        }
      }
    }

    log.info(cyan("Creating rehooks.json configuration file..."));
    const defaultConfig = { directory, forceOverwrite: false };

    try {
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
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
        fs.mkdirSync(directory, { recursive: true });
        log.success(green(`Hooks directory created at ${bold(directory)}.`));
      }
    } catch (error) {
      log.error("Error creating rehooks.json or hooks directory.");
      log.error(
        red(`Error creating rehooks.json or hooks directory: ${error}`),
      );
      return;
    }

    try {
      const config = await getConfig(process.cwd());
      log.success(green("Configuration loaded successfully."));

      if (!config) {
        log.warn(yellow("Configuration loaded, but may be incomplete."));
      }
    } catch (error) {
      log.error(red("Failed to load configuration."));
    }

    outro("Initialization complete!");
  });
