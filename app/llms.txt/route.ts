import { readFileSync } from "node:fs";
import path from "node:path";

export const dynamic = "force-static";
export function GET() {
  return new Response(
    readFileSync(path.resolve("resources/docs/llms.txt"), "utf8"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
