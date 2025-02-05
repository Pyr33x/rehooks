import { useCounter } from "./index";

function Component() {
  const { increment, decrement, reset, count, setCount } = useCounter(5);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setCount(10)}>Set to 10</button>
    </div>
  );
}
