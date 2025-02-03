import type { Hook } from "~/types/hook";

const path = "hooks.json";
const file = Bun.file(path);

type QueryParams = {
  search?: string;
};

async function getHooks({ search }: QueryParams): Promise<Hook[]> {
  const hooks: Hook[] = await file.json();

  if (search) {
    return hooks.filter((hook) =>
      hook.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return hooks;
}

export { getHooks };
