import { useEffect, useRef } from "react";

const description =
  "Tracks the previous value of a variable. Returns the previous value on every render.";

/**
 * Tracks the previous value of a variable. Returns the previous value on every render.
 *
 * @template T - The type of the value being tracked.
 * @param {T} value - The current value to track.
 * @returns {T | undefined} - The previous value, or `undefined` on the initial render.
 *
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
