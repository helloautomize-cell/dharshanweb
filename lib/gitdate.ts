/** Git last-modified dates (YYYY-MM-DD) for repo-relative files. */
import { execSync } from "node:child_process";

const cache = new Map<string, string | null>();

export function gitDate(relPath: string): string | null {
  if (cache.has(relPath)) return cache.get(relPath) ?? null;
  let date: string | null = null;
  try {
    const out = execSync(`git log -1 --format=%cs -- "${relPath}"`, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) date = out;
  } catch {
    // Git is unavailable in some build environments; omit lastModified then.
  }
  cache.set(relPath, date);
  return date;
}

export function latestGitDate(relPaths: string[]): string | null {
  return relPaths
    .map(gitDate)
    .filter((date): date is string => !!date)
    .sort()
    .pop() ?? null;
}
