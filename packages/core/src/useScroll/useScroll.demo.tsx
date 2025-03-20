import { useScroll } from "./index";

function Component() {
  const { position, scrollTo } = useScroll();

  return (
    <div>
      <h1>Scroll Position</h1>
      <p>X: {position.x}</p>
      <p>Y: {position.y}</p>
      <button onClick={() => scrollTo({ top: 0 })}>Scroll to top</button>
    </div>
  );
}
