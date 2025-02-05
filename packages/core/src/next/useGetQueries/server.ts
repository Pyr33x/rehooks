import { URLSearchParams } from "url";

type QueryParams<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};

export function getQueries<T extends Record<string, unknown>>(
  searchParams: URLSearchParams | Record<string, string | string[]>,
): QueryParams<T> {
  const params: Partial<QueryParams<T>> = {};

  const paramsObject =
    searchParams instanceof URLSearchParams
      ? Object.fromEntries(searchParams.entries())
      : searchParams;

  for (const [key, value] of Object.entries(paramsObject)) {
    const stringValue = Array.isArray(value) ? value.join(",") : value;

    if (stringValue === "true") {
      params[key as keyof T] = true as T[keyof T];
    } else if (stringValue.includes(",")) {
      params[key as keyof T] = stringValue.split(",") as T[keyof T];
    } else {
      params[key as keyof T] = stringValue as T[keyof T];
    }
  }

  return params as QueryParams<T>;
}
