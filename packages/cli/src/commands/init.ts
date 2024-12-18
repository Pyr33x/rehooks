import { green, red, cyan, bold, yellow } from "colorette";
import { getConfig } from "~/utils/config";
import { logger } from "~/utils/logger";
import { Command } from "commander";
import inquirer from "inquirer";
import semver from "semver";
import path from "path";
import ora from "ora";
import fs from "fs";

async function checkReactVersion() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    logger.error(
      red("Error: package.json not found in the project directory."),
    );
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const reactVersion =
    packageJson.dependencies?.react || packageJson.peerDependencies?.react;

  if (!reactVersion) {
    logger.error(
      red(
        "Error: React is not listed as a dependency or peer dependency in package.json.",
      ),
    );
    return false;
  }

  const cleanedVersion = semver.minVersion(reactVersion);
  if (!cleanedVersion || semver.lt(cleanedVersion, "18.0.0")) {
    logger.error(
      red(
        `Error: React version (${cleanedVersion || reactVersion}) is lower than 18. Please upgrade.`,
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
    const isReactCompatible = await checkReactVersion();
    if (!isReactCompatible) {
      logger.error(
        red("Initialization aborted due to React compatibility issues."),
      );
      return;
    }
    const configPath = options.config
      ? path.resolve(process.cwd(), options.config)
      : path.resolve(process.cwd(), "rehooks.json");

    if (fs.existsSync(configPath) && fs.statSync(configPath).isDirectory()) {
      logger.error(red(`Error: ${configPath} is a directory, not a file.`));
      return;
    }

    const spinner = ora(cyan("Initializing Rehooks configuration...")).start();
    let hooksDirExists = false;
    let currentDirectory: string | undefined;

    if (fs.existsSync(configPath)) {
      spinner.info(yellow("rehooks.json already exists."));
      spinner.stop();

      const currentConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      currentDirectory = currentConfig.directory;

      if (currentDirectory && currentDirectory === customPath) {
        logger.warn(
          yellow(
            `The hooks directory is already configured as ${bold(currentDirectory)}.`,
          ),
        );
        return;
      }

      if (options.force) {
        logger.info(cyan("Forcing overwrite of rehooks.json..."));
      } else {
        const { overwriteConfig } = await inquirer.prompt([
          {
            type: "confirm",
            name: "overwriteConfig",
            message: bold(
              red("rehooks.json already exists. Do you want to overwrite it?"),
            ),
            default: false,
          },
        ]);
        if (!overwriteConfig) {
          spinner.fail(red("Initialization aborted."));
          logger.warn(yellow("Initialization aborted."));
          return;
        }
      }

      if (currentDirectory && fs.existsSync(currentDirectory)) {
        hooksDirExists = true;
        fs.rmSync(currentDirectory, { recursive: true, force: true });
        spinner.succeed(
          green(
            `Previous hooks directory at ${bold(currentDirectory)} has been removed.`,
          ),
        );
      }
    }

    spinner.stop();

    let directory = customPath || "./hooks";
    if (!customPath) {
      const { srcFolderChoice } = await inquirer.prompt([
        {
          type: "list",
          name: "srcFolderChoice",
          message: bold("Does your project have a 'src' folder?"),
          choices: [
            { name: "Yes", value: true },
            { name: "No", value: false },
          ],
        },
      ]);
      directory = srcFolderChoice ? "./src/hooks" : "./hooks";
    }

    spinner.start(cyan("Creating rehooks.json configuration file..."));
    const defaultConfig = { directory, forceOverwrite: false };

    try {
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      spinner.succeed(
        green(`Rehooks configuration file created at ${bold(configPath)}.`),
      );

      if (
        !hooksDirExists ||
        (hooksDirExists &&
          customPath !== currentDirectory &&
          directory !== currentDirectory)
      ) {
        spinner.start(cyan("Creating hooks directory..."));
        fs.mkdirSync(directory, { recursive: true });
        spinner.succeed(
          green(`Hooks directory created at ${bold(directory)}.`),
        );
      }
    } catch (error) {
      spinner.fail(red("Error creating rehooks.json or hooks directory."));
      logger.error(
        red(`Error creating rehooks.json or hooks directory: ${error}`),
      );
      return;
    }

    try {
      spinner.start(cyan("Loading configuration..."));
      const config = await getConfig(process.cwd());
      spinner.succeed(green("Configuration loaded successfully."));

      if (!config) {
        logger.warn(yellow("Configuration loaded, but may be incomplete."));
      }
    } catch (error) {
      spinner.fail(red("Failed to load configuration."));
      logger.error(red("Failed to load configuration."));
    }
  });
