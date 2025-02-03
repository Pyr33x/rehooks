import { createFilter, createLimit } from "~/utilities/creators";
import { HttpError } from "~/classes/error";
import type { Hook } from "~/types/hook";

const path = "hooks.json";
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
    throw new HttpError("Couldn't find the requested hook.", 404);
  }
  return limitedHooks;
}

export { getHooks, HttpError };
