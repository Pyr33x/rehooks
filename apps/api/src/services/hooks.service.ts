import { createFilter, createLimit } from "../utilities/creators";
import type { Hook } from "../types/hook";

const path = "src/data/hooks.json";
const file = Bun.file(path);

type QueryParams = {
  search?: string;
  limit?: number;
};

type Response = Hook[];

async function getHooks({ search, limit }: QueryParams): Promise<Response> {
  const hooks: Hook[] = await file.json();

  const applySearch = search ? createFilter("title")(search) : () => true;
  const filteredHooks = hooks.filter(applySearch);
  const limitedHooks = limit
    ? createLimit(limit)(filteredHooks)
    : filteredHooks;

  if (!limitedHooks.length) {
    throw new Error("Couldn't find the requsted hook.");
  }

  return limitedHooks;
}

export { getHooks };
