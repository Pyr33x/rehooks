"use client";

import { useSearchParams } from "next/navigation";

type QueryParams<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};

export function useGetQueries<
  T extends Record<string, unknown>,
>(): QueryParams<T> {
  const searchParams = useSearchParams();
  const params: Partial<QueryParams<T>> = {};

  searchParams.forEach((value, key) => {
    if (value === "true") {
      params[key as keyof T] = true as T[keyof T];
    } else if (value.includes(",")) {
      params[key as keyof T] = value.split(",") as T[keyof T];
    } else {
      params[key as keyof T] = value as T[keyof T];
    }
  });

  return params as QueryParams<T>;
}
