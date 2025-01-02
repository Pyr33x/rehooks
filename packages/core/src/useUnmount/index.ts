import { useEffect, useRef } from "react";

const description = "Executes a callback function when the component unmounts.";

/**
 * Executes a callback function when the component unmounts.
 *
 * @param {() => void} fn - The callback function to be executed on unmount.
 */
export function useUnmount(fn: () => void): void {
  const fnRef = useRef<() => void>(fn);

  useEffect(() => {
    fnRef.current = fn;

    return () => {
      fnRef.current();
    };
  }, [fn]);
}
