import { configSchema, type RehooksConfig } from "~/schema/config.schema";
import { resolveImport } from "./resolver";
import { cosmiconfig } from "cosmiconfig";
import { handleError } from "./error";
import { log } from "@clack/prompts";
import path from "path";
import fs from "fs";

const explorer = cosmiconfig("rehooks", {
  searchPlaces: ["rehooks.json"],
});

export async function getConfig(cwd: string): Promise<RehooksConfig | null> {
  try {
    const config = await getRawConfig(cwd);
    return configSchema.parse(config);
  } catch (error) {
    log.error(`Error loading configuration: ${error}`);
    return null;
  }
}

export async function getRawConfig(cwd: string): Promise<unknown | null> {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return configResult.config;
  } catch (error) {
    const errorMessage = `Error loading configuration from ${cwd}/rehooks.json: ${error}`;
    log.error(errorMessage);
    throw handleError(errorMessage);
  }
}

export async function resolveConfigPaths(cwd: string, config: RehooksConfig) {
  const tsConfig = await getTsConfig(cwd);

  if (!tsConfig) {
    log.warn("TypeScript configuration not found.");
    return config;
  }

  return {
    ...config,
    resolvedPaths: {
      utils: await resolveImport(config.directory, tsConfig),
    },
  };
}

async function getTsConfig(cwd: string): Promise<unknown | null> {
  const tsConfigPath = path.resolve(cwd, "tsconfig.json");

  try {
    const tsConfigContent = await fs.promises.readFile(tsConfigPath, "utf-8");
    return JSON.parse(tsConfigContent);
  } catch (error) {
    log.error(`Error reading tsconfig.json: ${error}`);
    return null;
  }
}
