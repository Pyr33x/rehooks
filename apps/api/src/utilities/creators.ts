import type { CondHooks } from "~/types/hook";

const createFilter =
  <T extends keyof CondHooks>(key: T) =>
  (search: string) =>
  (hook: CondHooks) => {
    const value = hook[key];
    if (typeof value === "string") {
      return value.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  };

const createLimit = (limit: number) => (hooks: CondHooks[]) =>
  hooks.slice(0, limit);

export { createFilter, createLimit };
