import { useLang } from "./index";

function Component() {
  const lang = useLang();

  return <p>Current Language: {lang}</p>;
}
