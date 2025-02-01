export function trancute(text: string, length = 24): string {
  const words = text.split(" ");
  const truncatedWords = words.slice(0, length).join(" ");

  if (words.length > length) {
    return `${truncatedWords}...`;
  }

  return truncatedWords;
}
