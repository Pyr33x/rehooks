import { swagger } from "@elysiajs/swagger";
import { Server } from "~/classes/server";
import { cors } from "@elysiajs/cors";
import { ENV } from "~/schema/server";
import { root } from "~/routes";
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
  .listen(server.port);

console.table(server);
