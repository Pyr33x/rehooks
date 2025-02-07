import { useTitle } from "./index";
import { useState } from "react";

function Component() {
  const { title, changeTitle } = useTitle();
  const [newTitle, setNewTitle] = useState<string>("Hello World");
  return (
    <div>
      <h1>{title}</h1>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={() => changeTitle(newTitle)}>Change Title</button>
    </div>
  );
}
