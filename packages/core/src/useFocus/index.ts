import { useEffect, useRef, useState } from "react";

import type { RefObject } from "react";

type UseFocusCallback = (isFocused: boolean) => void;

const description = "Tracks the focus state of a specified element.";

/**
 * Tracks the focus state of a specified element.
 *
 * Optionally takes a callback function which is called whenever the element
 * gains or loses focus. The callback is called with a boolean indicating
 * whether the element is currently focused.
 *
 * @param callback Optional callback to run in focus and blur HTML element mode
 * @returns A tuple containing the ref and a boolean indicating whether the
 * element is currently focused.
 */
export function useFocus<T extends HTMLElement>(
  callback?: UseFocusCallback,
): [RefObject<T>, boolean] {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    /**
     * A function to run whenever the element gains focus.
     * @param {boolean} isFocused - Whether the element is currently focused.
     * @param {UseFocusCallback} [callback] - The callback function provided to useFocus.
     */
    const handleFocus = () => {
      setIsFocused(true);
      callback?.(true);
    };
    /**
     * A function to run whenever the element loses focus.
     * @param {boolean} isFocused - Whether the element is currently focused.
     * @param {UseFocusCallback} [callback] - The callback function provided to useFocus.
     */
    const handleBlur = () => {
      setIsFocused(false);
      callback?.(false);
    };

    const node = ref.current;
    if (node) {
      node.addEventListener("focus", handleFocus);
      node.addEventListener("blur", handleBlur);
    }

    return () => {
      if (node) {
        node.removeEventListener("focus", handleFocus);
        node.removeEventListener("blur", handleBlur);
      }
    };
  }, [callback]);

  return [ref, isFocused];
}
