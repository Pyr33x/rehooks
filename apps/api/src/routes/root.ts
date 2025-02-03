import { getHooks } from "~/services/hooks.service";
import { Elysia, t } from "elysia";

export const root = new Elysia().get(
  "/",
  ({ query }) => getHooks({ search: query.search }),
  {
    query: t.Object({
      search: t.Optional(t.String()),
    }),
  },
);
