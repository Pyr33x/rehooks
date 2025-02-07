import { useEffect, useRef, useState } from "react";

const description = "Tracks the hover state of a specified element.";

/**
 * Adds an event listener to a given target.
 *
 * @param eventType - The type of event to listen for.
 * @param listener - The event handler function.
 * @param target - The target to which the event listener will be attached.
 */
function useEventListener<K extends keyof HTMLElementEventMap>(
  eventType: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
  target: React.RefObject<HTMLElement>,
): void {
  useEffect(() => {
    const element = target.current;
    if (!element) return;

    element.addEventListener(eventType, listener);
    return () => {
      element.removeEventListener(eventType, listener);
    };
  }, [eventType, listener, target]);
}

/**
 * Tracks the hover state of a specified element.
 *
 * @returns A tuple containing a ref to attach to the element and a boolean indicating if it's hovered.
 */
export function useHover<T extends HTMLElement>(): [
  React.RefObject<T>,
  boolean,
] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEventListener("mouseenter", handleMouseEnter, ref);
  useEventListener("mouseleave", handleMouseLeave, ref);

  return [ref, isHovered];
}
