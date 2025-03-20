import { useCallback, useState } from "react";

import type { Dispatch, SetStateAction } from "react";

const description = "Returns a stateful value with two functions to update it.";

/**
 * Returns a stateful value with two functions to update it.
 *
 * @param defaultValue - The initial value of the state. Defaults to `false`.
 *
 * @returns A tuple containing:
 * - `boolean`: The current value of the state.
 * - `() => void`: A function to toggle the state.
 * - `Dispatch<SetStateAction<boolean>>`: A function to set the state to a new value.
 */
export function useToggle(
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => {
    setValue((x) => !x);
  }, []);

  return [value, toggle, setValue];
}
