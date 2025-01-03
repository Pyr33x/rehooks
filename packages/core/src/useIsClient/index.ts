import { useEffect, useState } from "react";

const description =
  "Determines if the component is rendered on the client side.";

/**
 * Determines if the component is rendered on the client side.
 *
 * @returns {boolean} - Returns true if the component is mounted on the client, false otherwise.
 */
export function useIsClient(): boolean {
  const [isClient, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
}
