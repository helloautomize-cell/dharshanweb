import alts from "../public/images/alt-text.json";

const table = alts as Record<string, string>;

export function altFor(key: string): string {
  return table[key] ?? "";
}
