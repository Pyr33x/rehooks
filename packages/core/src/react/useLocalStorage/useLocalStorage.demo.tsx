import React from "react";
import { useLocalStorage } from "./index";

function Component() {
  const [name, setName] = useLocalStorage("name", "John Doe");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h2>Local Storage Demo</h2>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <p>Your name is: {name}</p>
    </div>
  );
}
