type Route<T = {}> = (
  | { path: string; href?: never }
  | { href: string; path?: never }
) &
  T;

type Props<T = {}> = {
  routes: Route<T>[];
  pathname: string;
};

export function isActiveRoute<T = {}>({ routes, pathname }: Props<T>): boolean {
  const isActive = routes.some((route) => {
    const routePath = route.path || route.href;
    return routePath === pathname;
  });

  return isActive;
}
