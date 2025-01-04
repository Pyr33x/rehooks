import { useEffect, useState } from "react";

const description =
  "Provides a function to copy text to the clipboard effortlessly.";

/**
 * React hook to copy a given text to the user's clipboard.
 *
 * @param {number} [timeout=1500] Time in milliseconds to show the "copied"
 * success state after a successful copy action.
 *
 * @returns {object} An object with two properties:
 * - `isCopied`: A boolean indicating whether the text was successfully copied
 *   to the user's clipboard.
 * - `copy`: A function that takes a string argument and attempts to copy it to
 *   the user's clipboard. If the copy action is successful, it sets the
 *   `isCopied` state to `true`.
 */
export function useClipboard(timeout = 1500) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isCopied, timeout]);

  /**
   * Attempts to copy the given text to the user's clipboard.
   *
   * If the copy action is successful, it sets the `isCopied` state to `true`.
   * If the copy action fails, it logs an error to the console and
   * displays a native alert with the message "Failed to copy text".
   *
   * If the browser does not support the Clipboard API, it displays a
   * native alert with the message "Copy not supported".
   *
   * @param {string} text The text to copy to the user's clipboard.
   */
  const copy = (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
        })
        .catch((err: unknown) => {
          console.error("Failed to copy: ", err);
          alert("Failed to copy text");
        });
    } else {
      alert("Copy not supported");
    }
  };

  return { isCopied, copy };
}
