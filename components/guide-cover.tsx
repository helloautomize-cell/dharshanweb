import Image from "next/image";
import type { CSSProperties } from "react";
import { guideTopic, plainGuide, type Guide } from "@/lib/guides";

export function GuideCover({
  guide,
  og = false,
  markSrc = "/images/brand/mark-white.png",
}: {
  guide: Pick<Guide, "h1" | "topic" | "readingTime">;
  og?: boolean;
  markSrc?: string;
}) {
  const style: CSSProperties | undefined = og
    ? {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        width: 1200,
        height: 630,
        overflow: "hidden",
        padding: 56,
        background: "#0A1626",
        borderRadius: 28,
        color: "white",
        fontFamily: "Bricolage",
      }
    : undefined;
  const row: CSSProperties | undefined = og
    ? {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        fontSize: 16,
        color: "rgba(217,237,243,.65)",
      }
    : undefined;
  const Mark = og ? "img" : Image;
  return (
    <figure className="guide-cover on-night" data-dark style={style}>
      <div
        className="guide-cover-grid"
        aria-hidden="true"
        style={
          og ? { display: "flex", position: "absolute", inset: 0 } : undefined
        }
      >
        {[25, 50, 75].flatMap((position) => [
          <i
            key={`v${position}`}
            style={
              og
                ? {
                    position: "absolute",
                    left: `${position}%`,
                    top: 0,
                    width: 1,
                    height: "100%",
                    background: "rgba(217,237,243,.07)",
                  }
                : { left: `${position}%` }
            }
          />,
          <i
            key={`h${position}`}
            className="is-horizontal"
            style={
              og
                ? {
                    position: "absolute",
                    top: `${position}%`,
                    left: 0,
                    height: 1,
                    width: "100%",
                    background: "rgba(217,237,243,.07)",
                  }
                : { top: `${position}%` }
            }
          />,
        ])}
      </div>
      <span
        aria-hidden="true"
        className="guide-cover-circle is-large"
        style={
          og
            ? {
                position: "absolute",
                left: 790,
                top: 240,
                width: 460,
                height: 460,
                borderRadius: 230,
                background: "rgba(111,208,230,.08)",
              }
            : undefined
        }
      />
      <span
        aria-hidden="true"
        className="guide-cover-circle"
        style={
          og
            ? {
                position: "absolute",
                left: 870,
                top: 320,
                width: 300,
                height: 300,
                borderRadius: 150,
                background: "rgba(111,208,230,.16)",
              }
            : undefined
        }
      />
      <div className="guide-cover-top" style={row}>
        <span>Guide · {guideTopic(guide.topic).label}</span>
        <Mark
          src={markSrc}
          width={30}
          height={30}
          alt=""
          style={{ objectFit: "contain" }}
        />
      </div>
      <p
        className="guide-cover-title"
        style={
          og
            ? {
                display: "flex",
                flexWrap: "wrap",
                position: "relative",
                fontSize: 72,
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                width: 650,
                margin: 0,
              }
            : undefined
        }
      >
        {og
          ? guide.h1.split(" ").map((word, index) => (
              <span
                key={index}
                style={{
                  marginRight: 16,
                  ...(word.includes("*")
                    ? {
                        fontFamily: "Instrument",
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "#D9EDF3",
                      }
                    : {}),
                }}
              >
                {word.replaceAll("*", "")}
              </span>
            ))
          : guide.h1.split(/\*([^*]+)\*/).map((part, index) =>
              index % 2 ? (
                <span className="serif" key={index}>
                  {part}
                </span>
              ) : (
                part
              ),
            )}
      </p>
      <div className="guide-cover-bottom" style={row}>
        <span>rehabify.in/guides</span>
        <span>{guide.readingTime} read</span>
      </div>
      {!og && (
        <figcaption className="sr-only">
          Cover for the guide: {plainGuide(guide.h1)}
        </figcaption>
      )}
    </figure>
  );
}
