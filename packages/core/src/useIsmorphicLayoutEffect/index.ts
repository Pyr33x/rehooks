import { useEffect, useLayoutEffect } from "react";

const description =
  "Conditionally invokes useLayoutEffect on the server and useEffect on the client.";

/**
 * Conditionally invokes useLayoutEffect on the server and useEffect on the client.
 *
 * @template {() => void} T - Function type for the effect callback
 * @param {T} callback - Function to execute on mount and unmount
 * @param {any[]} deps - Dependencies array for the effect
 *
 * @returns {void}
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
