import { getHooks } from "~/services/hooks.service";
import { Elysia, t } from "elysia";

export const root = new Elysia().get(
  "/",
  ({ query }) => getHooks({ title: query.title }),
  {
    query: t.Object({
      title: t.Optional(t.String()),
    }),
  },
);
