import { useThrottle } from "./index";
import { useState } from "react";

function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const searchAPI = async (term: string) => {
    console.log("🔍 Searching for:", term);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      `Result 1 for ${term}`,
      `Result 2 for ${term}`,
      `Result 3 for ${term}`,
    ];
  };

  const handleSearch = useThrottle(
    async (term: string) => {
      if (term.trim() === "") {
        setResults([]);
        return;
      }
      const searchResults = await searchAPI(term);
      setResults(searchResults);
    },
    { wait: 1000 },
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <div>
          Try typing quickly - the search is throttled to once per second
        </div>
      </div>

      <div>
        {results.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
    </div>
  );
}
