import { useSyncExternalStore } from "react";

type WindowSize = {
  width: number;
  height: number;
};

const description = "Tracks and returns the current window size.";

const subscribeToResizeEvent = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => {
    window.removeEventListener("resize", cb);
  };
};

const getWindowSizeClient = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

// on the server window is undefined, so assume FullHD screen
const getWindowSizeServer = () => ({
  width: 1920,
  height: 1080,
});

/**
 * Tracks and returns the current window size.
 * @returns {WindowSize} An object containing the current width and height of the window.
 */
export function useWindowSize(): WindowSize {
  return useSyncExternalStore(
    subscribeToResizeEvent,
    getWindowSizeClient,
    getWindowSizeServer,
  );
}
