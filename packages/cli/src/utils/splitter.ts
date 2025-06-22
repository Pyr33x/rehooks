export function splitter(str: string): string[] {
  return str.split(/(?=[A-Z])/).map((word) => word.toLowerCase());
}
