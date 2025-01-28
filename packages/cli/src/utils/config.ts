import { log } from "@clack/prompts";
import { cosmiconfig } from "cosmiconfig";

import { handleError } from "./error";
import type { RehooksConfig } from "~/schema/config.schema";
import { configSchema } from "~/schema/config.schema";
import type { TsConfig } from "~/schema/tsconfig.schema";
import { tsConfigSchema } from "~/schema/tsconfig.schema";

const configExplorer = cosmiconfig("rehooks", {
  searchPlaces: ["rehooks.json"],
});

const tsConfigExplorer = cosmiconfig("tsconfig", {
  searchPlaces: ["tsconfig.json"],
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

async function getRawConfig(cwd: string): Promise<unknown | null> {
  try {
    const configResult = await configExplorer.search(cwd);

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

export async function getTsConfig(cwd: string): Promise<TsConfig | null> {
  try {
    const config = await getRawTsConfig(cwd);
    return tsConfigSchema.parse(config);
  } catch (error) {
    log.error(`Error loading TypeScript configuration: ${error}`);
    return null;
  }
}

async function getRawTsConfig(cwd: string): Promise<unknown | null> {
  try {
    const configResult = await tsConfigExplorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return configResult.config;
  } catch (error) {
    const errorMessage = `Error loading TypeScript configuration from ${cwd}/tsconfig.json: ${error}`;
    log.error(errorMessage);
    throw handleError(errorMessage);
  }
}
