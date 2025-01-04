import { configSchema, type RehooksConfig } from "~/schema/config.schema";
import { cosmiconfig } from "cosmiconfig";
import { handleError } from "./error";
import { log } from "@clack/prompts";

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
