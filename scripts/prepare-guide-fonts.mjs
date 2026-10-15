import { writeFile } from "node:fs/promises";
for (const family of ["bricolagegrotesque", "instrumentserif"]) {
  const license = await fetch(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`,
  );
  if (!license.ok)
    throw new Error(`Font license download failed: ${license.status}`);
  await writeFile(`public/fonts/${family}-OFL.txt`, await license.text());
}
for (const [family, name] of [
  ["Bricolage+Grotesque:wght@600", "bricolage-guides"],
  ["Instrument+Serif:ital@1", "instrument-serif-guides"],
]) {
  const response = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
  );
  if (!response.ok)
    throw new Error(`Font CSS request failed: ${response.status}`);
  const css = await response.text();
  const url = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`No font source for ${family}`);
  const font = await fetch(url);
  if (!font.ok) throw new Error(`Font download failed: ${font.status}`);
  await writeFile(
    `public/fonts/${name}.ttf`,
    Buffer.from(await font.arrayBuffer()),
  );
}
