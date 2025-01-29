import { useEffect, useLayoutEffect } from "react";

const description =
  "Conditionally invokes useLayoutEffect on the server and useEffect on the client.";

/**
 * Conditionally invokes useLayoutEffect on the server and useEffect on the client.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
