import { useHover } from "./index";

function Component() {
  const [ref, isHovered] = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: isHovered ? "lightblue" : "lightcoral",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s",
      }}
    >
      <p>{isHovered ? "Hovered!" : "Hover over me!"}</p>
    </div>
  );
}
