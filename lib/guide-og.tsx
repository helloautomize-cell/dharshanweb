import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { GuideCover } from "@/components/guide-cover";
import type { Guide } from "@/lib/guides";

export async function renderGuideImage(guide: Guide) {
  const [display, serif, mark] = await Promise.all([
    readFile(path.join(process.cwd(), "public/fonts/bricolage-guides.ttf")),
    readFile(
      path.join(process.cwd(), "public/fonts/instrument-serif-guides.ttf"),
    ),
    readFile(path.join(process.cwd(), "public/images/brand/mark-white.png")),
  ]);
  return new ImageResponse(
    <GuideCover
      guide={guide}
      og
      markSrc={`data:image/png;base64,${mark.toString("base64")}`}
    />,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Bricolage", data: display, weight: 600 },
        { name: "Instrument", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
