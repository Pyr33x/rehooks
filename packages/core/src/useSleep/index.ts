import { useCallback } from "react";

const description = "Resolves after a specified delay.";

/**
 * Resolves after a specified delay.
 * @param {number} ms - The number of milliseconds to wait before resolving.
 * @returns {Promise<void>} - A promise that resolves after the specified delay.
 *
 */
export function useSleep(): (ms: number) => Promise<void> {
  return useCallback((ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }, []);
}
