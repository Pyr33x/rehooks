import { log } from "@clack/prompts";
import { red } from "colorette";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { lt, minVersion } from "semver";

export function checkReactVersion() {
  const packageJsonPath = resolve(process.cwd(), "package.json");

  if (!existsSync(packageJsonPath)) {
    log.error(red("Error: package.json not found in the project directory."));
    return false;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
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

  const cleanedVersion = minVersion(reactVersion);
  if (!cleanedVersion || lt(cleanedVersion, "18.0.0")) {
    log.error(
      red(
        `React version (${cleanedVersion ?? reactVersion}) is lower than 18. Please upgrade.`,
      ),
    );
    return false;
  }
  return true;
}
