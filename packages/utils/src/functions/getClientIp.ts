import { fetcher } from "./api";

export async function getClientIp() {
  const res = await fetcher<{ ip: string }>(
    "https://api.ipify.org?format=json",
  );
  return res.ip;
}
