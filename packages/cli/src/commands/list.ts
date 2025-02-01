import { cancel, intro, isCancel, log, outro, spinner } from "@clack/prompts";
import axios from "axios";
import { bold, green, red } from "colorette";
import { Command } from "commander";

import type { Hook } from "~/schema/config.schema";
import { getConfig } from "~/utils/config";
import { BASE_URL } from "~/utils/constants";
import { sleep } from "~/utils/sleep";
import { trancute } from "~/utils/trancute";

export const list = new Command()
  .name("list")
  .description("List all available hooks in the API")
  .action(async () => {
    intro("Listing hooks...");

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

    try {
      const fetchSpinner = spinner();
      fetchSpinner.start("Fetching hooks...");

      await sleep(1000);

      const res = await axios.get<Hook[]>(`${BASE_URL}/hooks`);
      const hooksData = res.data;
      fetchSpinner.stop("Done.");

      if (isCancel(hooksData)) {
        cancel(red("Operation Cancelled."));
        process.exit(0);
      }

      log.info(`Total Hooks: ${hooksData.length}`);

      log.info(
        `Hooks List (${hooksData.length}):\n${hooksData
          .map((h) => `${bold(h.title)}: ${trancute(h.description, 7)}`)
          .join("\n")}`,
      );
    } catch (error) {
      outro(red(`Error listing hooks: ${error}`));
    }

    outro(green("Hooks listed successfully!"));
  });
