import { useCallback, useEffect, useState } from "react";

const description =
  "Implements countdown functionality with configurable options.";

type CountdownOptions = {
  countStart: number;
  intervalMs?: number;
  countStop?: number;
};

type CountdownControllers = {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
};

/**
 * Implements countdown functionality with configurable options.
 *
 * @param {CountdownOptions} options - The options for the countdown.
 * @param {number} options.countStart - The starting count value.
 * @param {number} [options.countStop=0] - The count value at which the countdown stops.
 * @param {number} [options.intervalMs=1000] - The interval in milliseconds at which the countdown updates.
 * @returns {[number, CountdownControllers]} - A tuple containing the current count and countdown controllers.
 */
export function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
}: CountdownOptions): [number, CountdownControllers] {
  const [count, setCount] = useState(countStart);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
    null,
  );

  const startCountdown = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  const stopCountdown = useCallback(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsRunning(false);
  }, [timer]);

  const resetCountdown = useCallback(() => {
    stopCountdown();
    setCount(countStart);
  }, [stopCountdown, countStart]);

  useEffect(() => {
    if (isRunning) {
      setTimer(
        setInterval(() => {
          setCount((prevCount) => {
            if (prevCount <= countStop) {
              stopCountdown();
              return countStop;
            }
            return prevCount - 1;
          });
        }, intervalMs),
      );
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, intervalMs, countStop, stopCountdown]);

  return [count, { startCountdown, stopCountdown, resetCountdown }];
}
