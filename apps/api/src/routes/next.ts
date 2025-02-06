import { getHooks } from "../services/hooks.service";
import { Elysia, t } from "elysia";

export const next = new Elysia()
  .get(
    "/next",
    ({ query }) =>
      getHooks({ search: query.search, limit: query.limit, type: "next" }),
    {
      query: t.Object({
        search: t.Optional(t.String()),
        limit: t.Optional(t.Integer()),
      }),
    },
  )
  .get("/next/:title", ({ params }) =>
    getHooks({ search: params.title, type: "next" }),
  );
