import { useBattery } from "./index";

function Component() {
  const batteryState = useBattery();

  return (
    <div>
      <h1>Battery State</h1>
      <p>Battery level: {batteryState.level}</p>
      <p>Battery charging: {batteryState.charging ? "yes" : "no"}</p>
      <p>Battery charging time: {batteryState.chargingTime}</p>
      <p>Battery discharging time: {batteryState.dischargingTime}</p>
    </div>
  );
}
