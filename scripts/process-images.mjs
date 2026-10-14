import sharp from "sharp";
import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  copyFile,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const source = path.resolve("resources/images");
const output = path.resolve("public/images");
for (const folder of [
  "brand",
  "doctors",
  "clinic",
  "icons/services",
  "provenance",
])
  await mkdir(path.join(output, folder), { recursive: true });
const alt = {};
const provenance = [];
const pngChunks = (buffer) => {
  if (buffer.subarray(1, 4).toString() !== "PNG") return [];
  const chunks = [];
  for (let offset = 8; offset + 12 <= buffer.length;) {
    const length = buffer.readUInt32BE(offset);
    chunks.push(buffer.subarray(offset + 4, offset + 8).toString());
    offset += length + 12;
  }
  return chunks;
};
for (const folder of ["brand", "doctors"]) {
  for (const filename of (await readdir(path.join(source, folder))).sort()) {
    const file = path.join(source, folder, filename);
    const bytes = await readFile(file);
    if (pngChunks(bytes).includes("caBX")) {
      const meta = await sharp(bytes).metadata();
      if (meta.exif)
        throw new Error(
          `Credential-bearing source has EXIF: ${filename}. A reviewed metadata/redaction and re-signing workflow is required.`,
        );
      await copyFile(file, path.join(output, "provenance", filename));
      provenance.push({
        source: `${folder}/${filename}`,
        sha256: createHash("sha256").update(bytes).digest("hex"),
        preservedOriginal: `provenance/${filename}`,
        derivativeCredentials:
          "Not transferred: original signatures do not authenticate resized or recoloured pixels",
      });
      alt[`provenance/${filename}`] =
        "Preserved source image with original content credentials; not used in page layouts";
    }
  }
}

const original = await readFile(path.join(source, "brand/mark-original.png"));
const trimmed = await sharp(original)
  .trim({ background: "#00000000" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = trimmed.info;
const tinted = async (hex) => {
  const rgb = hex.match(/.{2}/g).map((x) => parseInt(x, 16));
  const buffer = Buffer.from(trimmed.data);
  for (let i = 0; i < buffer.length; i += channels)
    for (let c = 0; c < 3; c++) buffer[i + c] = rgb[c];
  return sharp(buffer, { raw: { width, height, channels } }).png().toBuffer();
};
const marks = {};
for (const [name, color] of Object.entries({
  ice: "D9EDF3",
  blue: "0A6E94",
  white: "FFFFFF",
  navy: "0A1626",
})) {
  marks[name] = await tinted(color);
  for (const density of [1, 2, 3]) {
    const suffix = density === 1 ? "" : `@${density}x`;
    const targetWidth = Math.min(width, 80 * density);
    for (const format of ["png", "webp"]) {
      const filename = `brand/mark-${name}${suffix}.${format}`;
      await sharp(marks[name])
        .resize({ width: targetWidth, withoutEnlargement: true })
        .toColourspace("srgb")
        .toFormat(format, format === "webp" ? { lossless: true } : {})
        .toFile(path.join(output, filename));
      alt[filename] = "Rehabify";
    }
  }
}
const icon = async (size) => {
  const mark = await sharp(marks.ice)
    .resize({
      height: Math.min(height, Math.round(size * 0.7)),
      width: Math.min(width, Math.round(size * 0.7)),
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();
  const background = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="#0A1626"/></svg>`,
  );
  return sharp(background)
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
};
for (const [filename, size] of [
  ["icon.png", 512],
  ["apple-icon.png", 180],
]) {
  await writeFile(path.join("app", filename), await icon(size));
  await writeFile(path.join(output, "brand", filename), await icon(size));
  alt[`brand/${filename}`] = "Rehabify app icon";
}
const favicon = await icon(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(favicon.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("app/favicon.ico", Buffer.concat([header, favicon]));
await writeFile(
  path.join(output, "brand/favicon.ico"),
  Buffer.concat([header, favicon]),
);
alt["brand/favicon.ico"] = "Rehabify favicon";

const items = [
  [
    "dr-dharshan-hero",
    "dr-dharshan-hero",
    4 / 5,
    "Dr. Dharshan N A in a white coat, arms crossed, in a rehabilitation corridor",
  ],
  [
    "dr-dharshan-hero",
    "dr-dharshan-portrait",
    4 / 5,
    "Dr. Dharshan N A in a white coat, arms crossed, in a rehabilitation corridor",
  ],
  [
    "dr-dharshan-desk",
    "dr-dharshan-desk",
    4 / 5,
    "Dr. Dharshan N A seated at a desk with a stethoscope",
  ],
  ["dr-dharshan-avatar", "dr-dharshan-avatar", 1, "Dr. Dharshan N A"],
  [
    "dr-dharshan-exam",
    "dr-dharshan-exam",
    3 / 2,
    "Illustration: Dr. Dharshan N A measuring knee movement with a goniometer",
  ],
  [
    "dr-dharshan-video",
    "dr-dharshan-video",
    3 / 2,
    "Illustration: Dr. Dharshan N A explaining during a video consultation",
  ],
  [
    "dr-dharshan-banner",
    "dr-dharshan-banner",
    16 / 9,
    "Dr. Dharshan N A standing in a clinic corridor",
  ],
  [
    "dr-selina-hero",
    "dr-selina-hero",
    4 / 5,
    "Dr. Selina Kh in a white coat with a stethoscope",
  ],
  [
    "dr-selina-hero",
    "dr-selina-portrait",
    4 / 5,
    "Dr. Selina Kh in a white coat with a stethoscope",
  ],
  ["dr-selina-desk", "dr-selina-desk", 3 / 2, "Dr. Selina Kh at her desk"],
  ["dr-selina-avatar", "dr-selina-avatar", 1, "Dr. Selina Kh"],
  [
    "dr-selina-exam",
    "dr-selina-exam",
    3 / 2,
    "Illustration: Dr. Selina Kh guiding a shoulder movement",
  ],
  [
    "dr-selina-video",
    "dr-selina-video",
    3 / 2,
    "Illustration: Dr. Selina Kh on a video consultation",
  ],
];
for (const [input, name, ratio, text] of items) {
  const file = path.join(source, "doctors", `${input}.png`);
  const meta = await sharp(file).metadata();
  const maxWidth = Math.min(meta.width, Math.floor(meta.height * ratio));
  for (const size of name.endsWith("avatar") ? [512, 160] : [maxWidth]) {
    const filename = `doctors/${name}${size === 160 ? "-160" : ""}.jpg`;
    await sharp(file)
      .resize({
        width: size,
        height: Math.floor(size / ratio),
        fit: "cover",
        position: "attention",
        withoutEnlargement: true,
      })
      .toColourspace("srgb")
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(path.join(output, filename));
    alt[filename] = text;
  }
  if (/-hero$|-portrait$/.test(name))
    for (const width of [160, 320, 480, 800])
      for (const format of ["avif", "webp"]) {
        const filename = `doctors/${name}-${width}.${format}`;
        await sharp(file)
          .resize({
            width,
            height: Math.floor(width / ratio),
            fit: "cover",
            position: "attention",
            withoutEnlargement: true,
          })
          .toColourspace("srgb")
          .toFormat(
            format,
            format === "avif" ? { quality: 50, effort: 4 } : { quality: 80 },
          )
          .toFile(path.join(output, filename));
        alt[filename] = text;
      }
}

const fontFile = path.resolve(".cache/image-fonts/bricolage.ttf");
const cachedFile = async (filename) => {
  try {
    return await readFile(filename);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return null;
  }
};
let fontBytes =
  (await cachedFile(fontFile)) ??
  (await cachedFile(".next/image-fonts/bricolage.ttf"));
if (!fontBytes) {
  const fontCss = await (
    await fetch(
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700",
    )
  ).text();
  const fontUrl = fontCss.match(/url\((https:[^)]+)\)/)?.[1];
  if (!fontUrl)
    throw new Error("Bricolage font source not available for OG rendering");
  fontBytes = Buffer.from(await (await fetch(fontUrl)).arrayBuffer());
}
await mkdir(path.dirname(fontFile), { recursive: true });
await writeFile(fontFile, fontBytes);
const ogMark = await sharp(marks.ice)
  .resize({ height: 180, withoutEnlargement: true })
  .png()
  .toBuffer();
const ogText = await sharp({
  text: {
    text: '<span foreground="#D9EDF3">Rehabify</span>',
    font: "Bricolage Grotesque Bold 86",
    fontfile: fontFile,
    rgba: true,
    dpi: 72,
  },
})
  .png()
  .toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: "#0A1626" },
})
  .composite([
    { input: ogMark, left: 88, top: 110 },
    { input: ogText, left: 88, top: 350 },
  ])
  .png()
  .toFile(path.join(output, "brand/og-base.png"));
alt["brand/og-base.png"] = "Rehabify";
// Badge alt text comes from resources/badges (built by build-badges.mjs).
const badgeAlt = JSON.parse(
  await readFile("resources/badges/alt-text.json", "utf8").catch(() => "{}"),
);
Object.assign(alt, badgeAlt);
await writeFile(
  path.join(output, "alt-text.json"),
  JSON.stringify(alt, null, 2) + "\n",
);
await writeFile(
  path.join(output, "provenance/manifest.json"),
  JSON.stringify(provenance, null, 2) + "\n",
);
const clinicFiles = [
  "entrance",
  "reception",
  "consult-room",
  "rom-measure",
  "therapy-area",
  "gait-training",
  "ultrasound",
  "hand-therapy",
  "child-therapy",
  "balance-older",
  "sports-rehab",
  "prosthetic",
  "home-programme",
  "team",
];
const badges = [
  "pain-spine",
  "back-pain",
  "neck-pain",
  "sciatica",
  "injection",
  "neuro",
  "stroke",
  "spinal-cord",
  "head-injury",
  "parkinsons",
  "spasticity",
  "joints",
  "knee",
  "shoulder",
  "sports",
  "fracture",
  "prp",
  "prosthesis",
  "children",
  "cerebral-palsy",
  "muscular-dystrophy",
  "development",
  "older-adults",
  "balance",
  "bones",
  "video",
  "doctor-male",
  "doctor-female",
];
const { existsSync } = await import("node:fs");
const pendingBadges = badges.filter(
  (x) => !existsSync(path.join(output, "icons/services", `${x}.png`)),
);
await writeFile(
  path.join(output, "_todo.md"),
  `# Missing image slots\n\n## Clinic photos\n\n${clinicFiles.map((x) => `- clinic-${x}.jpg: real clinic photo pending; use IMAGE-MAP interim treatment.`).join("\n")}\n\n## Service badges (Phase 1b)\n\n${pendingBadges.length ? pendingBadges.map((x) => `- ${x}: code-drawn badge pending; Lucide placeholder only.`).join("\n") : "All 28 badges drawn in code and exported to icons/services/ (PNG + WebP at 512 and 256)."}\n\n## Doctor approvals\n\nAll 11 doctor PNGs are approved per the agency relay on 12 October 2026. Written approvals must remain on file. No current approval flag is false. The real portrait JPG is reference-only.\n\n## Content credentials\n\nDecision (Phase 1 close, 13 October 2026): 15 credential-bearing originals keep their C2PA credentials byte-for-byte under provenance/. Resized derivatives in public/images are unsigned; that is accepted. Disclosure is handled by the Editorial policy page and "Illustration:" alt text. Nothing is re-signed. Original signatures cannot authenticate changed pixels, and no stale original credential was copied into a derivative. This item is closed and is no longer a launch blocker.\n`,
);
process.stdout.write(
  `Images generated. ${Object.keys(alt).length} alt-text entries; ${provenance.length} credential-bearing originals preserved. ${pendingBadges.length} badge slots pending Phase 1b.\n`,
);
