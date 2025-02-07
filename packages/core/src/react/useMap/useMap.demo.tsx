import { useMap } from "./index";

function Component() {
  const [map, { set, delete: remove, clear, initialize }] = useMap<
    string,
    string
  >([
    ["key1", "Initial Value 1"],
    ["key2", "Initial Value 2"],
  ]);

  const handleAdd = () => {
    const key = `key${map.size + 1}`;
    const value = `Value ${map.size + 1}`;
    set(key, value);
  };

  const handleRemove = (key: string) => {
    remove(key);
  };

  const handleClear = () => {
    clear();
  };

  const handleReset = () => {
    initialize([
      ["key1", "Reset Value 1"],
      ["key2", "Reset Value 2"],
    ]);
  };

  return (
    <div>
      <h2>Map Demo</h2>
      <div>
        <button onClick={handleAdd}>Add New Entry</button>
        <button onClick={handleClear}>Clear Map</button>
        <button onClick={handleReset}>Reset Map</button>
      </div>

      <div>
        <h3>Current Map Entries:</h3>
        {Array.from(map.entries()).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value}
            <button onClick={() => handleRemove(key)}>Remove</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Map Size:</h3>
        <p>{map.size} entries</p>
      </div>
    </div>
  );
}
