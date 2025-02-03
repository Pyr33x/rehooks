import { swagger } from "@elysiajs/swagger";
import { Server } from "~/classes/server";
import { cors } from "@elysiajs/cors";
import { ENV } from "~/schema/server";
import { Elysia } from "elysia";

const server = new Server(
  Number(ENV.PORT),
  `http://localhost:${ENV.PORT}`,
  `http://localhost:${ENV.PORT}/swagger`,
);

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get("/:title", ({ params: { title } }) => title)
  .listen(server.port);

console.table(server);
