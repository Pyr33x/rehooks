import { useCountdown } from "./index";

function CountdownDemo() {
  const [counter, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 10,
      intervalMs: 1000,
      countStop: 0,
    });

  return (
    <div>
      <h2>Countdown Demo</h2>
      <p>Current Count: {counter}</p>
      <button onClick={startCountdown}>Start Countdown</button>
      <button onClick={stopCountdown}>Stop Countdown</button>
      <button onClick={resetCountdown}>Reset Countdown</button>
    </div>
  );
}
