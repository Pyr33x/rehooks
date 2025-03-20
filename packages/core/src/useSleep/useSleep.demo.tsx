import { useSleep } from "./index";
import { useState } from "react";

function Component() {
  const [isSleeping, setIsSleeping] = useState(false);
  const sleep = useSleep();

  const handleClick = () => {
    setIsSleeping(true);
    sleep(2000).then(() => setIsSleeping(false));
  };

  return (
    <div>
      <p>Is sleeping: {isSleeping ? "true" : "false"}</p>
      <button onClick={handleClick}>Sleep</button>
    </div>
  );
}
