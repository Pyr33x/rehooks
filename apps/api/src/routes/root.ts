import { getHooks } from "~/services/hooks.service";
import { HttpError } from "~/classes/error";
import { Elysia, t } from "elysia";

export const root = new Elysia().get(
  "/",
  async ({ query }) => {
    try {
      const { search, limit } = query;
      const result = await getHooks({
        search: search,
        limit: limit,
      });
      return result;
    } catch (error) {
      if (error instanceof HttpError) {
        return {
          status: error.statusCode,
          message: error.message,
        };
      }
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  },
  {
    query: t.Object({
      search: t.Optional(t.String()),
      limit: t.Optional(t.Integer()),
    }),
  },
);
