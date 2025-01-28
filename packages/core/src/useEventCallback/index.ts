import { useRef, useEffect, useCallback } from "react";

const description =
  "Returns a memoized callback that remains stable across renders.";

/**
 * Returns a memoized callback that remains stable across renders.
 *
 * @param fn The callback function that depends on external values.
 * @returns A stable version of the provided callback.
 */
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef<T>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(((...args) => ref.current(...args)) as T, []);
}
