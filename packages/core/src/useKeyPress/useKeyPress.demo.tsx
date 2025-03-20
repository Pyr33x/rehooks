import { useKeyPress } from "./index";

function Component() {
  const altS = useKeyPress({ key: "s", alt: true });

  return <div>{altS ? "Saving document..." : "Type your text here..."}</div>;
}
