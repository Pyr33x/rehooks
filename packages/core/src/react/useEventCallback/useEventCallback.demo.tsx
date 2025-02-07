import { useState } from "react";
import { useEventCallback } from "./index";

function Component() {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = useEventCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setPosition({ x: event.clientX, y: event.clientY });
    },
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ width: "100%", height: "400px", border: "1px solid black" }}
    >
      <p>
        Mouse position: X: {position.x}, Y: {position.y}
      </p>
    </div>
  );
}
