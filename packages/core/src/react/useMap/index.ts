import { useCallback, useState } from "react";

const description =
  "Provides a reactive Map instance with common mutation methods for state management.";

type MapActions<K, V> = {
  /**
   * Sets a key-value pair in the map
   * @param key - Map key to set
   * @param value - Value to associate with the key
   */
  set: (key: K, value: V) => void;

  /**
   * Deletes a key from the map
   * @param key - Map key to remove
   * @returns true if the key existed and was removed
   */
  delete: (key: K) => boolean;

  /** Clears all entries from the map */
  clear: () => void;

  /**
   * Initializes/replaces the entire map contents
   * @param entries - Iterable of key-value pairs to initialize the map
   */
  initialize: (entries: Iterable<[K, V]>) => void;
};

/**
 * Creates a reactive Map instance with mutation methods for state updates.
 * @template K - Type of map keys
 * @template V - Type of map values
 * @param {Iterable<[K, V]>} [initialEntries] - Initial map entries (optional)
 * @returns {[ReadonlyMap<K, V>, MapActions<K, V>]} Tuple containing:
 * - Current map state (readonly)
 * - Object with map mutation methods
 */
export function useMap<K, V>(
  initialEntries?: Iterable<[K, V]> | (() => Iterable<[K, V]>),
): [ReadonlyMap<K, V>, MapActions<K, V>] {
  const [map, setMap] = useState(() => {
    const entries =
      typeof initialEntries === "function" ? initialEntries() : initialEntries;
    return new Map(entries);
  });

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  }, []);

  const deleteFn = useCallback((key: K) => {
    let didDelete = false;
    setMap((prev) => {
      const next = new Map(prev);
      didDelete = next.delete(key);
      return next;
    });
    return didDelete;
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  const initialize = useCallback((entries: Iterable<[K, V]>) => {
    setMap(new Map(entries));
  }, []);

  return [map, { set, delete: deleteFn, clear, initialize }];
}
