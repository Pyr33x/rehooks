import { useEffect, useState } from "react";

const description =
  "Manages a state variable synchronized with session storage.";

/**
 * Manages a state variable synchronized with session storage.
 *
 * @param {string} key - The key for the session storage item.
 * @param {T} initialValue - The initial value for the state variable.
 * @returns {[T, (value: T) => void]} An array containing the state variable and a setter function.
 *
 * @example
 * const [name, setName] = useSessionStorage('name', 'John Doe');
 * // The name variable will be persisted in session storage under the key 'name'.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading session storage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting session storage key "${key}":`, error);
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
