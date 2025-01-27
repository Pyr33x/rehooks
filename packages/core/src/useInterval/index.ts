import { useEffect, useRef, useState } from "react";

type UseIntervalOptions = {
  immediate?: boolean;
  autoStart?: boolean;
};

export function useInterval(
  callback: () => void,
  delay: number | null,
  options?: UseIntervalOptions,
) {
  const savedCallback = useRef(callback);
  const { immediate = false, autoStart = true } = options || {};
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay !== "number" || !isRunning) return;
    if (immediate) {
      savedCallback.current();
    }

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, isRunning, immediate]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const toggle = () => setIsRunning(!isRunning);

  return { start, stop, toggle, isRunning };
}
