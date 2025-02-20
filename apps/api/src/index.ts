import { react, root, next } from "./routes";
import { swagger } from "@elysiajs/swagger";
import { Server } from "./classes/server";
import { ENV } from "./schema/server";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

const server = new Server(
  Number(ENV.PORT),
  `http://localhost:${ENV.PORT}`,
  `http://localhost:${ENV.PORT}/docs`,
);

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Rehooks API",
          version: "1.0.0",
        },
      },
    }),
  )
  .use(cors())
  .use(root)
  .use(react)
  .use(next)
  .listen(server.port);

console.table(server);
