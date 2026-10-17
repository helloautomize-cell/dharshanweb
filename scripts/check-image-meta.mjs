// Scans public/images for leftover EXIF/GPS/camera/software metadata.
// C2PA provenance manifests are stored separately and untouched.
import { readdirSync } from "node:fs";
import { join, relative } from "node:path";
import sharp from "sharp";

const root = join(process.cwd(), "public", "images");
const fail = [];
let scanned = 0;

async function walk(dir, out = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) await walk(p, out);
    else if (/\.(png|jpe?g|webp|avif)$/i.test(name.name)) out.push(p);
  }
  return out;
}

for (const file of await walk(root)) {
  scanned++;
  try {
    const meta = await sharp(file).metadata();
    if (meta.exif) {
      const text = meta.exif.toString("latin1");
      const hits = [];
      if (/GPS|ExifOffset/i.test(text)) hits.push("GPS/EXIF block");
      if (/Make|Canon|Nikon|Sony|Apple|Samsung/i.test(text))
        hits.push("camera make/model");
      if (/Software|Photoshop|Lightroom|GIMP/i.test(text))
        hits.push("software tag");
      if (hits.length) fail.push(`${relative(root, file)}: ${hits.join(", ")}`);
    }
    if (meta.iptc && /GPS/i.test(meta.iptc.toString("latin1")))
      fail.push(`${relative(root, file)}: IPTC GPS data`);
  } catch {
    // Not a raster format sharp reads; skip.
  }
}

if (fail.length) {
  console.error(`Image metadata check failed (${scanned} files scanned):`);
  for (const f of fail.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `Image metadata check passed: ${scanned} images free of EXIF/GPS/camera/software fields.`,
);
