import { useState } from "react";
import { useDebounceCallback } from "./index";

function Component() {
  const [inputValue, setInputValue] = useState("");

  const debouncedLog = useDebounceCallback((value: string) => {
    console.log("Debounced Input Value:", value);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    debouncedLog(value);
  };

  return (
    <div>
      <h2>Debounced Callback Example</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
    </div>
  );
}
