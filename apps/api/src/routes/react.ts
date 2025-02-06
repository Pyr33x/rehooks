import { getHooks } from "../services/hooks.service";
import { Elysia, t } from "elysia";

export const react = new Elysia()
  .get(
    "/react",
    ({ query }) =>
      getHooks({ search: query.search, limit: query.limit, type: "react" }),
    {
      query: t.Object({
        search: t.Optional(t.String()),
        limit: t.Optional(t.Integer()),
      }),
    },
  )
  .get("/react/:title", ({ params }) =>
    getHooks({ search: params.title, type: "react" }),
  );
