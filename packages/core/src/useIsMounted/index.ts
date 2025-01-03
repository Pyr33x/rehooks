import { useEffect, useRef } from "react";

const description =
  "Returns a function to check if the component is currently mounted.";

type UseIsMountedReturnType = () => boolean;

/**
 * A Returns a function to check if the component is currently mounted.
 *
 * This hook can be useful for preventing state updates on unmounted components,
 * which can lead to memory leaks and errors in your application.
 *
 * @returns {Function} A function that returns a boolean indicating whether the component is mounted.
 */
export function useIsMounted(): UseIsMountedReturnType {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return () => isMounted.current;
}
