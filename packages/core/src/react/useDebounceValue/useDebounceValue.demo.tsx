import { useState, useEffect } from "react";
import { useDebounceValue } from "./index";

function Component() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounceValue(searchInput, 500);

  useEffect(() => {
    if (debouncedSearchInput)
      console.log("Debounced Search Input:", debouncedSearchInput);
  }, [debouncedSearchInput]);

  return (
    <div>
      <h2>Debounced Search</h2>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Type something to search..."
      />
      <p>Search Input: {searchInput}</p>
      <p>Debounced Input: {debouncedSearchInput}</p>
    </div>
  );
}
