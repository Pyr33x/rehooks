import { useSyncExternalStore } from "react";

type DeviceDetect = {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  DesktopView: () => boolean;
  MobileView: () => boolean;
  TabletView: () => boolean;
};

const description =
  "Detects device type and returns a boolean for each detected type.";

// Device type is constant and never changes
const emptySubscribe = () => () => {};

const getDeviceTypeClient = (): DeviceDetect => {
  const userAgent = navigator.userAgent;
  let deviceType = "desktop";
  if (/tablet/i.test(userAgent)) {
    deviceType = "tablet";
  } else if (/mobile/i.test(userAgent)) {
    deviceType = "mobile";
  }
  const isMobile = deviceType === "mobile";
  const isDesktop = deviceType === "desktop";
  const isTablet = deviceType === "tablet";

  const DesktopView = () => isDesktop;
  const MobileView = () => isMobile;
  const TabletView = () => isTablet;

  return {
    isMobile,
    isDesktop,
    isTablet,
    DesktopView,
    MobileView,
    TabletView,
  };
};

const getDeviceTypeServer = (): DeviceDetect => ({
  isMobile: false,
  isDesktop: true,
  isTablet: false,
  DesktopView: () => true,
  MobileView: () => false,
  TabletView: () => false,
});

/**
 * Detects device type and returns a boolean for each detected type.
 *
 * @returns {DeviceDetect} - An object containing boolean values for each device type.
 */
export function useDevice(): DeviceDetect {
  return useSyncExternalStore(
    emptySubscribe,
    getDeviceTypeClient,
    getDeviceTypeServer,
  );
}
