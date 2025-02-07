import { useEffect, useState } from "react";

const description =
  "Fetches and monitors device battery level and charging state.";

type BatteryManager = {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ): void;
};

type BatteryState = {
  supported: boolean;
  loading: boolean;
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
};

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>;
};

/**
 * Fetches and monitors device battery level and charging state.
 *
 * @description Provides battery information including level, charging status, and estimated time for charging and discharging.
 * Handles unsupported environments by setting `supported` to `false`.
 *
 * @returns {BatteryState} - An object with battery state properties:
 * - `supported` {boolean}: Indicates if the Battery API is supported.
 * - `loading` {boolean}: True while fetching initial battery data.
 * - `level` {number | null}: Battery level as a decimal (0.0 to 1.0), or null if unavailable.
 * - `charging` {boolean | null}: Whether the battery is currently charging, or null if unavailable.
 * - `chargingTime` {number | null}: Estimated time in seconds until fully charged, or null if unavailable.
 * - `dischargingTime` {number | null}: Estimated time in seconds until battery is depleted, or null if unavailable.
 */
export function useBattery() {
  const [batteryState, setBatteryState] = useState<BatteryState>({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    const _navigator = navigator as NavigatorWithBattery;
    let battery: BatteryManager | null = null;

    /**
     * Updates the battery state when a battery property changes.
     */
    const handleBatteryChange = () => {
      if (battery) {
        setBatteryState({
          supported: true,
          loading: false,
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        });
      }
    };

    if (!_navigator.getBattery) {
      setBatteryState((prevState) => ({
        ...prevState,
        supported: false,
        loading: false,
      }));
      return;
    }

    _navigator
      .getBattery()
      .then((_battery) => {
        battery = _battery;
        handleBatteryChange();
        battery.addEventListener("levelchange", handleBatteryChange);
        battery.addEventListener("chargingchange", handleBatteryChange);
        battery.addEventListener("chargingtimechange", handleBatteryChange);
        battery.addEventListener("dischargingtimechange", handleBatteryChange);
      })
      .catch(() => {
        setBatteryState((prevState) => ({
          ...prevState,
          supported: false,
          loading: false,
        }));
      });

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleBatteryChange);
        battery.removeEventListener("chargingchange", handleBatteryChange);
        battery.removeEventListener("chargingtimechange", handleBatteryChange);
        battery.removeEventListener(
          "dischargingtimechange",
          handleBatteryChange,
        );
      }
    };
  }, []);

  return batteryState;
}
