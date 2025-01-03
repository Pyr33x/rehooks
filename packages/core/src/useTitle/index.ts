import { useState } from "react";

const description = "Changes the page title dynamically.";

/**
 * Changes the page title dynamically.
 *
 * @description Provides a stateful title and a function to update both the state and the document title.
 *
 * @returns {Object} - An object containing:
 * - `title` {string}: The current page title.
 * - `changeTitle` {(newTitle: string) => void}: Function to update the page title.
 */

export function useTitle() {
  const [title, setTitle] = useState<string>(document.title);

  /**
   * Updates the document title and internal title state.
   *
   * @param {string} newTitle - The new title to set for the page.
   */
  const changeTitle = (newTitle: string) => {
    setTitle(newTitle);
    document.title = newTitle;
  };

  return { title, changeTitle };
}
