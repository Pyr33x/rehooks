import { useRef, useState } from "react";
import { useEventListener } from "./index";

function Component() {
  const [clicks, setClicks] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEventListener("click", () => {
    setClicks((prev) => prev + 1);
    console.log("Clicked on window");
  });

  useEventListener(
    "mouseenter",
    () => {
      console.log("Mouse entered the div!");
    },
    divRef,
  );

  return (
    <div>
      <p>Clicks on window: {clicks}</p>
      <div ref={divRef}>Hover over this div</div>
    </div>
  );
}
