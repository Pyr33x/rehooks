import type { Hook } from "~/types/hook";

const path = "hooks.json";
const file = Bun.file(path);

type QueryParams = {
  search?: string;
  limit?: number;
};

type LimitError = {
  message: string;
  code: number;
};

async function getHooks({
  search,
  limit,
}: QueryParams): Promise<Hook[] | LimitError> {
  const hooks: Hook[] = await file.json();

  if (search) {
    return hooks.filter((hook) =>
      hook.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (limit) {
    return hooks.slice(0, limit);
  }

  return hooks;
}

export { getHooks };
