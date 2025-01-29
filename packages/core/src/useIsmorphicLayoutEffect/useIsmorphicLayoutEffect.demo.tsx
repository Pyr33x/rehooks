import { useIsomorphicLayoutEffect } from "./index";
import { useState } from "react";

function Component() {
  const [count, setCount] = useState(0);

  useIsomorphicLayoutEffect(() => {
    console.log("useIsomorphicLayoutEffect");
  }, []);

  useIsomorphicLayoutEffect(() => {
    console.log("useIsomorphicLayoutEffect");
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
    </div>
  );
}
