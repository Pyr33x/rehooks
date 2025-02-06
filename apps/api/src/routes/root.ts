import { Elysia } from "elysia";

const returnRoot = {
  title: "Rehooks API",
  description: "The API for Rehooks",
  version: "1.0.0",
  endpoints: {
    react: ["/react", "/react/:title"],
    next: ["/next", "/next/:title"],
  },
};

export const root = new Elysia().get("/", () => returnRoot);
