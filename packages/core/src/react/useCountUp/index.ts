import { useCallback, useEffect, useState } from "react";

const description =
  "Implements count-up functionality with customizable settings.";

type CountupOptions = {
  countStart: number;
  intervalMs?: number;
  countStop?: number;
};

type CountupControllers = {
  startCountup: () => void;
  stopCountup: () => void;
  resetCountup: () => void;
};

/**
 * Implements count-up functionality with customizable settings.
 *
 * @param {CountupOptions} options - The options for the count-up.
 * @param {number} options.countStart - The starting count value.
 * @param {number} [options.countStop=Infinity] - The count value at which the count-up stops.
 * @param {number} [options.intervalMs=1000] - The interval in milliseconds at which the count-up updates.
 * @returns {[number, CountupControllers]} - A tuple containing the current count and count-up controllers.
 */
export function useCountup({
  countStart,
  countStop = Infinity,
  intervalMs = 1000,
}: CountupOptions): [number, CountupControllers] {
  const [count, setCount] = useState(countStart);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
    null,
  );

  const startCountup = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  const stopCountup = useCallback(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsRunning(false);
  }, [timer]);

  const resetCountup = useCallback(() => {
    stopCountup();
    setCount(countStart);
  }, [stopCountup, countStart]);

  useEffect(() => {
    if (isRunning) {
      setTimer(
        setInterval(() => {
          setCount((prevCount) => {
            if (prevCount >= countStop) {
              stopCountup();
              return countStop;
            }
            return prevCount + 1;
          });
        }, intervalMs),
      );
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, intervalMs, countStop, stopCountup]);

  return [count, { startCountup, stopCountup, resetCountup }];
}
