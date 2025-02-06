import { createFilter, createLimit } from "../utilities/creators";
import type { React, Next, CondHooks } from "../types/hook";

const reactPath = "react.json";
const nextPath = "next.json";
const reactFile = Bun.file(reactPath);
const nextFile = Bun.file(nextPath);

type QueryParams = {
  search?: string;
  limit?: number;
  type: "react" | "next";
};

type Response = CondHooks[];

async function getHooks({
  search,
  limit,
  type,
}: QueryParams): Promise<Response> {
  let hooks: CondHooks[];
  if (type === "react") {
    hooks = await reactFile.json();
  } else if (type === "next") {
    hooks = await nextFile.json();
  } else {
    const reactHooks: React[] = await reactFile.json();
    const nextHooks: Next[] = await nextFile.json();
    hooks = [...reactHooks, ...nextHooks];
  }

  const applySearch = search ? createFilter("title")(search) : () => true;
  const filteredHooks = hooks.filter(applySearch);

  const limitedHooks = limit
    ? createLimit(limit)(filteredHooks)
    : filteredHooks;

  if (!limitedHooks.length) {
    throw new Error("Couldn't find the requested hook.");
  }

  return limitedHooks;
}

export { getHooks };
