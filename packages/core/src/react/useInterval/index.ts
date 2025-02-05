import { useEffect, useRef, useState } from "react";

const description =
  "Sets up an interval with imperative controls. Returns start/stop methods and running state.";

type IntervalOptions = {
  immediate?: boolean;
  autoStart?: boolean;
};

type IntervalReturn = {
  start: () => void;
  stop: () => void;
  toggle: () => void;
  isRunning: boolean;
};

/**
 * Sets up an interval with imperative controls. Returns start/stop methods and running state.
 *
 * @template {() => void} T - Function type for the interval callback
 * @param {T} callback - Function to execute at each interval tick (automatically uses latest version)
 * @param {number | null} delay - Interval delay in milliseconds (null to clear interval)
 * @param {IntervalOptions} [options] - Optional configuration for the interval
 *
 * - `immediate`: If true, the callback function will be executed immediately after the interval starts (default: false)
 * - `autoStart`: If true, the interval will start automatically (default: true)
 *
 * @returns {IntervalReturn} An object containing the following properties:
 * - `start`: A function to start the interval.
 * - `stop`: A function to stop the interval.
 * - `toggle`: A function to toggle the interval on and off.
 * - `isRunning`: A boolean indicating whether the interval is currently running.
 */
export function useInterval(
  callback: () => void,
  delay: number | null,
  options?: IntervalOptions,
): IntervalReturn {
  const savedCallback = useRef(callback);
  const { immediate = false, autoStart = true } = options ?? {};
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
