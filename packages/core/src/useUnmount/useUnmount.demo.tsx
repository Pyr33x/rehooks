import { useUnmount } from "./index";
import { useState } from "react";

function Component() {
  const [count, setCount] = useState(0);

  useUnmount(() => {
    console.log(`Component unmounted with count: ${count}`);
  });

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
