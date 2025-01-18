import { useRef, useEffect } from "react";

/**
 * Tracks the previous value of a variable.
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
