import { usePrevious } from "./index";
import { useState } from "react";

function Component() {
  const [value, setValue] = useState(0);
  const previousValue = usePrevious(value);

  return (
    <div>
      <p>Current value: {value}</p>
      <p>Previous value: {previousValue}</p>
      <button onClick={() => setValue((prev) => prev + 1)}>Increment</button>
    </div>
  );
}
