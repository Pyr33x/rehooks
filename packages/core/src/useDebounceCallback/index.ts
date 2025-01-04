import { useCallback, useEffect, useRef } from "react";

const description =
  "Debounces a callback, executing it only after a specified delay.";

/**
 * Debounces a callback, executing it only after a specified delay.
 *
 * @param {Function} callback - The callback function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - A debounced version of the callback function.
 *
 * @example
 * const debouncedSave = useDebounceCallback((value) => {
 *   console.log("Saving data:", value);
 * }, 500);
 */
export function useDebounceCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return debouncedCallback;
}
