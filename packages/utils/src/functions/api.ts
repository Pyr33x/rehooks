import axios from "axios";

export const api = axios.create({
  baseURL: "https://rehooks.dev/api",
});

export const fetcher = async <T>(url: string) => {
  const { data } = await api.get<T>(url);
  return data;
};
