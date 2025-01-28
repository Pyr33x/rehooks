import { useSyncExternalStore } from "react";

const description = "Returns the current online/offline status of the client.";

/**
 * Custom hook that returns the current online/offline status of the client.
 * Optionally, takes a callback function to be invoked whenever the status changes.
 *
 * @param {function} callback - Optional callback to run on status change.
 * @returns {boolean} - `true` if online, `false` if offline.
 */
export function useStatus(callback?: (isOnline: boolean) => void): boolean {
  return useSyncExternalStore(
    (cb) => {
      const abortController = new AbortController();
      window.addEventListener(
        "online",
        () => {
          cb();
          callback?.(true);
        },
        { signal: abortController.signal },
      );
      window.addEventListener(
        "offline",
        () => {
          cb();
          callback?.(false);
        },
        {
          signal: abortController.signal,
        },
      );
      return () => {
        abortController.abort();
      };
    },
    () => navigator.onLine,
    () => true,
  );
}
