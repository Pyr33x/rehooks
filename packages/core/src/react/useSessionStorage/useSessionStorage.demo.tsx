import React from "react";
import { useSessionStorage } from "./index";

function Component() {
  const [name, setName] = useSessionStorage("name", "John Doe");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h2>Session Storage Demo</h2>
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
