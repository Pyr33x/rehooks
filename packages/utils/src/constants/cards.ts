import type { Card } from "../types";

export const cards: Card[] = [
  {
    label: "Rehooks",
    title: "Open-Source Codebase",
    code: `const rehooks = {
  openSource: true,
  license: "MIT",
  issues: "open",
  commits: "+500",
  version: "v4.0.0",
}`,
  },
  {
    label: "Rehooks",
    title: "TypeScript Support",
    content:
      "Rehooks is written in TypeScript, ensuring type safety and maintainability throughout the codebase. This enhances code clarity and reduces errors, making it easier to understand and extend.",
  },
  {
    label: "Rehooks",
    title: "Variety of Hooks",
    content:
      "Rehooks offers a variety of hooks for different use cases, including useThrottle and useDebounceCallback, enabling developers to implement common functionality in their components.",
  },
  {
    label: "Rehooks",
    title: "Performant & Reusability",
    content:
      "All hooks are expertly crafted with SOLID principles, ensuring not only efficient and optimized performance but also robust functionality that enhances the overall development experience.",
  },
];