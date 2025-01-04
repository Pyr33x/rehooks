import { useSyncExternalStore } from "react";

const description =
  "Returns the user’s current browser language based on their settings.";

/**
 * Subscribes to the `languagechange` event on the `window` object to detect changes in the user's preferred language.
 * This function returns an unsubscribe function to remove the event listener.
 *
 * @param {() => void} callback - The callback function that triggers when the language changes.
 * @returns {() => void} A function to unsubscribe from the `languagechange` event.
 */
function langSubscribe(callback: () => void) {
  window.addEventListener("languagechange", callback);
  return () => {
    window.removeEventListener("languagechange", callback);
  };
}

/**
 * Retrieves the current language of the user's browser.
 *
 * @returns {string} The current language code (e.g., 'en-US', 'fr', etc.).
 */
const getLang = (): string => navigator.language;

/**
 * Returns the user’s current browser language based on their settings.
 *
 * @returns {string} The current browser language.
 */
export function useLang(): string {
  return useSyncExternalStore(langSubscribe, getLang);
}
