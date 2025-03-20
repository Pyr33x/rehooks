import { useIsClient } from "./index";

function Component() {
  const isClient = useIsClient();

  return <div>{isClient ? "Client" : "Server"}</div>;
}
