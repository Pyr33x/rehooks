"use client";

import { usePathname } from "next/navigation";

type Route<T = {}> = (
  | { path: string; href?: never }
  | { href: string; path?: never }
) &
  T;

type Props<T = {}> = {
  routes: Array<Route<T>>;
};

export function useActiveLink<T = {}>({ routes }: Props<T>): boolean {
  const pathname = usePathname();

  const isActive = routes.some((route) => {
    const routePath = route.path || route.href;
    return routePath === pathname;
  });

  return isActive;
}
