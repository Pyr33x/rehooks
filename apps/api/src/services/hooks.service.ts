import type { Hook } from "~/types/hook";

const path = "hooks.json";
const file = Bun.file(path);

async function getHooks({ title }: { title?: string }): Promise<Hook[]> {
  const hooks: Hook[] = await file.json();

  if (title) {
    return hooks.filter((hook) =>
      hook.title.toLowerCase().includes(title.toLowerCase()),
    );
  }

  return hooks;
}

export { getHooks };
