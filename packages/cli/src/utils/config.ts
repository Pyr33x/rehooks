import { log } from "@clack/prompts";
import { cosmiconfig } from "cosmiconfig";
import * as jsonc from "jsonc-parser";

import { handleError } from "./error";
import type { RehooksConfig } from "~/schema/config.schema";
import { configSchema } from "~/schema/config.schema";
import type { TsConfig } from "~/schema/tsconfig.schema";
import { tsConfigSchema } from "~/schema/tsconfig.schema";

function jsonLoader(filepath: string, content: string) {
  const errors: jsonc.ParseError[] = [];
  const result = jsonc.parse(content, errors, {
    allowTrailingComma: true,
  });

  if (errors.length > 0) {
    throw new Error(`Error parsing JSON: ${JSON.stringify(errors)}`);
  }

  return result;
}

const configExplorer = cosmiconfig("rehooks", {
  searchPlaces: ["rehooks.json"],
  loaders: {
    ".json": jsonLoader,
  },
});

const tsConfigExplorer = cosmiconfig("tsconfig", {
  searchPlaces: ["tsconfig.json"],
  loaders: {
    ".json": jsonLoader,
  },
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
