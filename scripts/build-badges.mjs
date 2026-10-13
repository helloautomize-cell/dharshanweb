import sharp from "sharp";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const srcDir = path.resolve("resources/badges/src");
const outDir = path.resolve("resources/badges/out");
const publicDir = path.resolve("public/images/icons/services");
const sheetDir = path.resolve("artifacts/badges");
const base = await readFile("resources/badges/badge-base.svg", "utf8");

const altText = {
  "pain-spine": "Illustration of a spine with a highlighted lower back",
  "back-pain": "Illustration of a person bending with a hand on the lower back",
  "neck-pain": "Illustration of a head and neck with motion arcs",
  sciatica: "Illustration of a leg with a nerve line down to the foot",
  injection: "Illustration of an ultrasound probe beside a fine needle",
  neuro: "Illustration of a brain connected to the spinal cord",
  stroke: "Illustration of a person taking a step with a walking stick",
  "spinal-cord": "Illustration of a wheelchair beside a vertebra column",
  "head-injury": "Illustration of a head with a protective halo",
  parkinsons: "Illustration of a hand holding a cup steadily",
  spasticity: "Illustration of a bent arm gently extending",
  joints: "Illustration of a knee joint with range of motion arcs",
  knee: "Illustration of a knee with a goniometer arc",
  shoulder: "Illustration of a shoulder with an arm raising in an arc",
  sports: "Illustration of a runner mid stride with a resistance band",
  fracture: "Illustration of a long bone with a healed line and plate",
  prp: "Illustration of a small vial with a drop beside a knee outline",
  prosthesis: "Illustration of a lower leg prosthesis taking a step",
  children: "Illustration of a child holding a parent's hand",
  "cerebral-palsy": "Illustration of a child standing with a small walker",
  "muscular-dystrophy": "Illustration of a child with a ball and strength arcs",
  development: "Illustration of building blocks with rising footsteps",
  "older-adults": "Illustration of an older adult walking with a cane",
  balance: "Illustration of a person standing on one foot",
  bones: "Illustration of a hip bone with a density pattern",
  video: "Illustration of a laptop showing a doctor and a speech bubble",
  "doctor-male": "Illustration of a male doctor with a stethoscope",
  "doctor-female": "Illustration of a female doctor with a stethoscope",
};

await mkdir(outDir, { recursive: true });
await mkdir(publicDir, { recursive: true });
await mkdir(sheetDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => f.endsWith(".svg")).sort();
const order = Object.keys(altText);
const missing = order.filter((slug) => !files.includes(`${slug}.svg`));
if (missing.length) throw new Error(`Missing badge sources: ${missing}`);
if (files.length !== order.length)
  throw new Error(`Expected ${order.length} badges, found ${files.length}`);

const alt = {};
const cells = [];
for (const file of files) {
  const slug = file.replace(/\.svg$/, "");
  const drawing = await readFile(path.join(srcDir, file), "utf8");
  if (/fill="(?!#F2B48A|none)[^"]+"/.test(drawing.replace(/fill="none"/g, "")))
    console.warn(`${slug}: unexpected fill colour`);
  const svg = base.replace("<!-- @drawing -->", drawing);
  await writeFile(path.join(outDir, `${slug}.svg`), svg);
  for (const size of [512, 256]) {
    const suffix = size === 256 ? "@256" : "";
    for (const format of ["png", "webp"]) {
      const filename = `${slug}${suffix}.${format}`;
      await sharp(Buffer.from(svg), { density: 384 })
        .resize(size, size)
        .toFormat(format, format === "webp" ? { lossless: true } : {})
        .toFile(path.join(publicDir, filename));
      alt[`icons/services/${filename}`] = altText[slug];
    }
  }
  cells.push(
    await sharp(Buffer.from(svg), { density: 384 })
      .resize(230, 230)
      .png()
      .toBuffer(),
  );
}

// Merge badge alt text into the public map without clobbering other entries.
const altPath = path.resolve("public/images/alt-text.json");
const existing = JSON.parse(await readFile(altPath, "utf8").catch(() => "{}"));
await writeFile(
  altPath,
  JSON.stringify({ ...existing, ...alt }, null, 2) + "\n",
);
await writeFile(
  path.resolve("resources/badges/alt-text.json"),
  JSON.stringify(alt, null, 2) + "\n",
);

// Contact sheet: 6 columns x 5 rows, 1440 wide, night background.
const cols = 6;
const cell = 240;
const rows = Math.ceil(cells.length / cols);
await sharp({
  create: {
    width: cols * cell,
    height: rows * cell,
    channels: 4,
    background: "#0A1626",
  },
})
  .composite(
    cells.map((input, i) => ({
      input,
      left: (i % cols) * cell + 5,
      top: Math.floor(i / cols) * cell + 5,
    })),
  )
  .png()
  .toFile(path.join(sheetDir, "contact-sheet.png"));

process.stdout.write(
  `Built ${files.length} badges: SVG in resources/badges/out/, PNG+WebP at 512 and 256 in public/images/icons/services/, contact sheet at artifacts/badges/contact-sheet.png\n`,
);
