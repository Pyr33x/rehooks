import { useCallback, useEffect, useRef } from "react";

const description =
  "Returns a memoized callback that remains stable across renders.";

/**
 * Returns a memoized callback that remains stable across renders.
 *
 * @param fn The callback function that depends on external values.
 * @returns A stable version of the provided callback.
 */
export function useEventCallback<T extends (...args: unknown[]) => void>(
  fn: T,
): T {
  const ref = useRef<T>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(((...args) => ref.current(...args)) as T, []);
}
