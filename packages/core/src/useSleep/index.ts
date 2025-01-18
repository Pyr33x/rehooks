import { useCallback } from "react";

const description = "Resolves after a specified delay.";

/**
 * Resolves after a specified delay.
 * @returns {Function}
 *
 */
export function useSleep(): (ms: number) => Promise<void> {
  return useCallback((ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }, []);
}
