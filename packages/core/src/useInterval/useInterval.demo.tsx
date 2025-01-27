import { useInterval } from "./index";
import { useState } from "react";

export function SimpleIntervalDemo() {
  const [count, setCount] = useState(0);
  const { isRunning, start, stop } = useInterval(
    () => setCount((c) => c + 1),
    1000,
  );

  return (
    <div>
      <h2>Counter: {count}</h2>
      <div>
        <button onClick={start} disabled={isRunning}>
          Start
        </button>
        <button onClick={stop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <p>Status: {isRunning ? "Running" : "Stopped"}</p>
    </div>
  );
}
