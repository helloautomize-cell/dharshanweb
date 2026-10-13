import type { ReactNode } from "react";
import Link from "next/link";
import { Confirm } from "@/components/primitives";

// Renders the content-file markdown dialect: paragraphs, - and 1. lists,
// > callouts, | tables |, **bold**, *italic*, [links](href), [CONFIRM: x].
export function renderInline(text: string, keyPrefix = ""): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern =
    /\[CONFIRM:([^\]]+)\]|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]/g;
  let last = 0;
  let match;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    if (match[1] !== undefined)
      out.push(
        <Confirm key={`${keyPrefix}${i}`}>[CONFIRM:{match[1]}]</Confirm>,
      );
    else if (match[3] !== undefined)
      out.push(
        <Link key={`${keyPrefix}${i}`} href={match[3]}>
          {match[2]}
        </Link>,
      );
    else if (match[4] !== undefined)
      out.push(<strong key={`${keyPrefix}${i}`}>{match[4]}</strong>);
    else if (match[5] !== undefined)
      out.push(<em key={`${keyPrefix}${i}`}>{match[5]}</em>);
    else if (match[6] !== undefined) out.push(match[6]);
    last = match.index + match[0].length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function metaLine(body: string, key: string): string | null {
  const match = body.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match ? match[1].trim() : null;
}

export function BlockRenderer({ body }: { body: string }) {
  const blocks: ReactNode[] = [];
  const lines = body.split("\n");
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[\s-|]+\|?$/.test(lines[i]))
          rows.push(
            lines[i]
              .replace(/^\||\|$/g, "")
              .split("|")
              .map((c) => c.trim()),
          );
        i++;
      }
      const [head, ...rest] = rows;
      blocks.push(
        <div className="table-wrap" key={key++}>
          <table>
            <thead>
              <tr>
                {head.map((cell, c) => (
                  <th key={c}>{renderInline(cell, `${key}h${c}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rest.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>{renderInline(cell, `${key}r${r}c${c}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul className="content-list" key={key++}>
          {items.map((item, j) => (
            <li key={j}>{renderInline(item, `${key}i${j}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s*/, ""));
        i++;
      }
      blocks.push(
        <ol className="content-list" key={key++}>
          {items.map((item, j) => (
            <li key={j}>{renderInline(item, `${key}i${j}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }
    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote className="content-quote" key={key++}>
          <p>{renderInline(quote.join(" "), `${key}q`)}</p>
        </blockquote>,
      );
      continue;
    }
    // plain paragraph: join wrapped lines
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("|") &&
      !lines[i].startsWith(">") &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    const text = para.join(" ").trim();
    if (text === "Callout:") continue;
    blocks.push(<p key={key++}>{renderInline(text, `${key}p`)}</p>);
  }
  return <>{blocks}</>;
}
