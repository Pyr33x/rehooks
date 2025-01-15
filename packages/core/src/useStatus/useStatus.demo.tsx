import { useStatus } from "./index";

function Component() {
  const isOnline = useStatus();

  return <p>Is online: {isOnline ? "Yes" : "No"}</p>;
}
