import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function renderPageImage(title: string, kicker = "Rehabify") {
  const [display, serif, mark] = await Promise.all([
    readFile(path.join(process.cwd(), "public/fonts/bricolage-guides.ttf")),
    readFile(
      path.join(process.cwd(), "public/fonts/instrument-serif-guides.ttf"),
    ),
    readFile(path.join(process.cwd(), "public/images/brand/mark-white.png")),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "#0A1626",
        padding: 72,
        fontFamily: "Bricolage",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires plain img */}
      <img
        alt=""
        src={`data:image/png;base64,${mark.toString("base64")}`}
        width={88}
        height={88}
        style={{ marginBottom: "auto" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            color: "#7DD6D0",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            color: "#F5F8FA",
            fontSize: title.length > 42 ? 64 : 78,
            lineHeight: 1.05,
            fontWeight: 600,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#8FA5B8",
            fontSize: 26,
            fontFamily: "Instrument",
            fontStyle: "italic",
          }}
        >
          Physical medicine and rehabilitation, Bengaluru and online
        </div>
      </div>
    </div>,
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
