import { swagger } from "@elysiajs/swagger";
import { Server } from "~/classes/server";
import { cors } from "@elysiajs/cors";
import { ENV } from "~/schema/server";
import { root } from "~/routes";
import { Elysia } from "elysia";

const server = new Server(
  Number(ENV.PORT),
  `http://localhost:${ENV.PORT}`,
  `http://localhost:${ENV.PORT}/swagger`,
);

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(root)
  .listen(server.port);

console.table(server);
