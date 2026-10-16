import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import path from "node:path";
import sharp from "sharp";

async function snapshot(directory) {
  const files = await readdir(directory, {
    recursive: true,
    withFileTypes: true,
  });
  const hashes = {};
  for (const file of files.filter((file) => file.isFile())) {
    const filename = path.join(file.parentPath, file.name);
    hashes[path.relative(directory, filename)] = createHash("sha256")
      .update(await readFile(filename))
      .digest("hex");
  }
  return hashes;
}
const sources = await snapshot("resources/images");
execFileSync(process.execPath, ["scripts/process-images.mjs"], {
  stdio: "inherit",
});
const first = await snapshot("public/images");
execFileSync(process.execPath, ["scripts/process-images.mjs"], {
  stdio: "inherit",
});
assert.deepEqual(
  await snapshot("public/images"),
  first,
  "Image processing must be idempotent",
);
assert.deepEqual(
  await snapshot("resources/images"),
  sources,
  "Sources must remain unchanged",
);
for (const file of (await readdir("public/images/doctors")).filter((file) =>
  /\.(jpg|avif|webp)$/.test(file),
)) {
  const name = file
    .replace(/-(160|320|480|800|1120)(?=\.(jpg|avif|webp)$)/, "")
    .replace("-portrait", "-hero")
    .replace(/\.(jpg|avif|webp)$/, ".png");
  const original = await sharp(`resources/images/doctors/${name}`).metadata();
  const output = await sharp(`public/images/doctors/${file}`).metadata();
  assert(
    output.width <= original.width && output.height <= original.height,
    `Upscale: ${file}`,
  );
  assert(!output.exif, `EXIF must be removed: ${file}`);
}
const trimmed = await sharp("resources/images/brand/mark-original.png")
  .trim({ background: "#00000000" })
  .ensureAlpha()
  .png()
  .toBuffer();
for (const color of ["ice", "blue", "white", "navy"])
  for (const density of ["", "@2x", "@3x"]) {
    const file = `public/images/brand/mark-${color}${density}.png`;
    const output = await sharp(file).metadata();
    const expected = await sharp(trimmed)
      .resize({ width: output.width, withoutEnlargement: true })
      .extractChannel(3)
      .raw()
      .toBuffer();
    const actual = await sharp(file).extractChannel(3).raw().toBuffer();
    assert.deepEqual(actual, expected, `Logo alpha shape changed: ${file}`);
  }
const manifest = JSON.parse(
  await readFile("public/images/provenance/manifest.json", "utf8"),
);
for (const item of manifest) {
  const preserved = await readFile(`public/images/${item.preservedOriginal}`);
  assert.equal(
    createHash("sha256").update(preserved).digest("hex"),
    item.sha256,
  );
}
assert(
  !(await readdir("public/images/doctors")).some((file) =>
    file.includes("real-portrait"),
  ),
);
process.stdout.write(
  `Image verification passed: ${Object.keys(first).length} files are idempotent, sources unchanged, no upscaling or EXIF in derivatives, 12 logo alpha masks preserved, ${manifest.length} credential-bearing originals byte-identical.\n`,
);
