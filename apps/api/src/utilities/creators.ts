import type { Hook } from "~/types/hook";

const createFilter =
  <T extends keyof Hook>(key: T) =>
  (search: string) =>
  (hook: Hook) => {
    const value = hook[key];
    if (typeof value === "string") {
      return value.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  };

const createLimit = (limit: number) => (hooks: Hook[]) => hooks.slice(0, limit);

export { createFilter, createLimit };
