import { useCountup } from "./index";

function Component() {
  const [counter, { startCountup, stopCountup, resetCountup }] = useCountup({
    countStart: 10,
    intervalMs: 1000,
    countStop: Infinity,
  });

  return (
    <div>
      <h2>Countup Demo</h2>
      <p>Current Count: {counter}</p>
      <button onClick={startCountup}>Start Countup</button>
      <button onClick={stopCountup}>Stop Countup</button>
      <button onClick={resetCountup}>Reset Countup</button>
    </div>
  );
}
