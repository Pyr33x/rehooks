import { useEffect, useState } from "react";

const description = "Manages a state variable synchronized with local storage.";

/**
 * Manages a state variable synchronized with local storage.
 *
 * @param {string} key - The key for the local storage item.
 * @param {T} initialValue - The initial value for the state variable.
 * @returns {[T, (value: T) => void]} An array containing the state variable and a setter function.
 *
 * @example
 * const [name, setName] = useLocalStorage('name', 'John Doe');
 * // The name variable will be persisted in local storage under the key 'name'.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading local storage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting local storage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(
          event.newValue ? JSON.parse(event.newValue) : initialValue,
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}
