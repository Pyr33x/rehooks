import { useToggle } from "./index";

function Component() {
  const [isOn, toggle, setToggle] = useToggle(false);

  return (
    <div>
      <p>Current state: {isOn ? "On" : "Off"}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setToggle(true)}>Turn On</button>
      <button onClick={() => setToggle(false)}>Turn Off</button>
    </div>
  );
}
