import { useEffect, useState } from "react";

const description = "Debounces a value, updating it after a specified delay.";

/**
 * Debounces a value, updating it after a specified delay.
 * Useful for cases where you want to prevent frequent updates (e.g., input fields).
 *
 * @template T - The type of the value being debounced.
 * @param {T} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {T} - The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
 * // The debouncedSearchTerm will update 500ms after the last change in searchTerm.
 */
export function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
