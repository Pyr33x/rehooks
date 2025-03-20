export async function getClientIp() {
  const res = await fetch("https://api.ipify.org?format=json");
  return res.json().then((data) => data.ip);
}
