import { getHooks } from "~/services/hooks.service";
import { Elysia, t } from "elysia";

export const root = new Elysia()
  .get(
    "/",
    ({ query }) => getHooks({ search: query.search, limit: query.limit }),
    {
      query: t.Object({
        search: t.Optional(t.String()),
        limit: t.Optional(t.Integer()),
      }),
    },
  )
  .get("/:title", ({ params }) => getHooks({ search: params.title }));
