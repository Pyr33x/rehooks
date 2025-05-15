import { useCallback, useEffect, useRef } from "react";

type ThrottleOptions = {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
};

export function useThrottle<T extends (...args: unknown[]) => void>(
  fn: T,
  options: ThrottleOptions = {},
): (...args: Parameters<T>) => void {
  const { wait = 300, leading = true, trailing = true } = options;

  const timeoutRef = useRef<number | null>(null);
  const lastRunRef = useRef<number>(0);
  const lastArgsRef = useRef<Parameters<T> | null>(null);
  const fnRef = useRef(fn);
  const isFirstCall = useRef(true);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const elapsed = now - lastRunRef.current;
      lastArgsRef.current = args;

      const execute = () => {
        if (lastArgsRef.current) {
          fnRef.current(...lastArgsRef.current);
          lastRunRef.current = Date.now();
          timeoutRef.current = null;
        }
      };

      if (isFirstCall.current) {
        isFirstCall.current = false;
        if (leading) {
          execute();
          return;
        }
      }

      if (elapsed >= wait) {
        if (leading) {
          execute();
        } else if (trailing && timeoutRef.current === null) {
          timeoutRef.current = window.setTimeout(execute, wait);
        }
      } else if (trailing && timeoutRef.current === null) {
        timeoutRef.current = window.setTimeout(execute, wait - elapsed);
      }
    },
    [wait, leading, trailing],
  );
}
