import { useCallback, useMemo, useState } from "react";

import type { Dispatch, SetStateAction } from "react";

type CounterReturnType = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

const description =
  "Returns a tuple with counter value and increment, decrement, reset functions.";

/**
 * Returns a tuple with counter value and increment, decrement, reset functions.
 *
 * - `increment`: A function that increments the counter by 1.
 * - `decrement`: A function that decrements the counter by 1.
 * - `reset`: A function that sets the counter to 0.
 * - `count`: The current value of the counter.
 * - `setCount`: A state setter function that sets the counter to the given
 *   value.
 *
 * The hook takes an optional `initialValue` parameter which sets the initial
 * value of the counter. If not provided, the counter is initialized to 0.
 *
 * @param {number} [initialValue] Optional initial value of the counter.
 * @returns {CounterReturnType}
 */
export function useCounter(initialValue?: number): CounterReturnType {
  const [count, setCount] = useState(initialValue ?? 0);

  const increment = useCallback(() => {
    setCount((x) => x + 1);
  }, []);
  const decrement = useCallback(() => {
    setCount((x) => x - 1);
  }, []);
  const reset = useCallback(() => {
    setCount(initialValue ?? 0);
  }, [initialValue]);

  const returnObject = useMemo(
    () => ({
      increment,
      decrement,
      reset,
      count,
      setCount,
    }),
    [increment, decrement, reset, count, setCount],
  );

  return returnObject;
}
