// design-diff.mjs — Phase 7b
// Screenshots design v3 and the built site, one shot per section per width,
// writes -v3 / -built / -pair images, prints pixelmatch mismatch % and
// generates design-diff/index.html.
import { chromium } from "playwright-core";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "design-diff");
const DESIGN = join(ROOT, "resources/design/rehabify-design-v3.html");
const BASE = process.env.DESIGN_DIFF_URL || "http://127.0.0.1:3000";

const sections = [
  ["00-top", 0],
  ["01-why", "#why"],
  ["02-where", "#where"],
  ["03-care", "#care"],
  ["04-journey", "#journey"],
  ["05-ways", "#ways"],
  ["06-doctor", "#doctor"],
  ["07-visit", "#visit"],
  ["09-book", "#book"],
];
const widths = [
  { w: 1440, h: 900 },
  { w: 390, h: 844 },
];

// Other templates vs their nearest v3 component (page top at scroll 0).
const pages = [
  ["hub-pain-and-spine", "/pain-and-spine/", "01-why"],
  ["care-back-pain", "/pain-and-spine/back-pain/", "02-where"],
  ["profile-dharshan", "/dr-dharshan-n-a/", "06-doctor"],
  ["profile-selina", "/dr-selina-kh/", "06-doctor"],
  ["styleguide", "/styleguide/", "system"],
];

// tiny static server for the design file
const serveDesign = () =>
  new Promise((resolve) => {
    const server = createServer((req, res) => {
      res.setHeader("content-type", "text/html");
      res.end(readFileSync(DESIGN));
    });
    server.listen(0, "127.0.0.1", () =>
      resolve({ server, port: server.address().port }),
    );
  });

async function shoot(page, url, id, dir) {
  if (id.endsWith("-built")) {
    await page.addInitScript(() =>
      localStorage.setItem(
        "rehabify-consent-v1",
        JSON.stringify({ analytics: false, v: 1, ts: Date.now() }),
      ),
    );
  }
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (const [name, sel] of sections) {
    if (sel !== 0) {
      await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return;
        scrollTo(0, el.getBoundingClientRect().top + scrollY - 80);
      }, sel);
      await page.waitForTimeout(500);
    } else {
      await page.evaluate(() => scrollTo(0, 0));
    }
    await page.screenshot({ path: join(dir, `${id}-${name}.png`) });
  }
}

const diff = (a, b) => {
  const pa = PNG.sync.read(readFileSync(a));
  const pb = PNG.sync.read(readFileSync(b));
  const w = Math.min(pa.width, pb.width);
  const h = Math.min(pa.height, pb.height);
  const ca = new PNG({ width: w, height: h });
  const cb = new PNG({ width: w, height: h });
  PNG.bitblt(pa, ca, 0, 0, w, h, 0, 0);
  PNG.bitblt(pb, cb, 0, 0, w, h, 0, 0);
  const out = new PNG({ width: w * 2 + 8, height: h });
  PNG.bitblt(ca, out, 0, 0, w, h, 0, 0);
  PNG.bitblt(cb, out, 0, 0, w, h, w + 8, 0);
  const n = pixelmatch(ca.data, cb.data, null, w, h, { threshold: 0.15 });
  return { pct: ((n / (w * h)) * 100).toFixed(1), pair: out };
};

mkdirSync(OUT, { recursive: true });
const rows = [];
const { server, port } = await serveDesign();
const browser = await chromium.launch();
try {
  // grab the v3 #system shot once per width (needed by the styleguide pair)
  const v3System = {};
  for (const { w, h } of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await shoot(page, `http://127.0.0.1:${port}/`, `${w}-v3`, OUT);
    await shoot(page, `${BASE}/`, `${w}-built`, OUT);
    // v3 system section reference for the styleguide pair
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const el = document.querySelector("#system");
      scrollTo(0, el.getBoundingClientRect().top + scrollY - 80);
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(OUT, `${w}-v3-system.png`) });
    v3System[w] = true;
    for (const [name] of sections) {
      const { pct, pair } = diff(
        join(OUT, `${w}-v3-${name}.png`),
        join(OUT, `${w}-built-${name}.png`),
      );
      writeFileSync(join(OUT, `${w}-${name}-pair.png`), PNG.sync.write(pair));
      rows.push([w, name, pct]);
      console.log(`${w} ${name}: ${pct}% mismatch`);
    }
    // extra template pages: shoot page top (or #system for the styleguide),
    // diff vs nearest v3 section
    for (const [id, url, v3sel] of pages) {
      await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
      await page.evaluate(
        (target) => {
          const el = target && document.querySelector(target);
          scrollTo(0, el ? el.getBoundingClientRect().top + scrollY - 80 : 0);
        },
        v3sel === "system" ? "#system" : null,
      );
      await page.waitForTimeout(700);
      await page.screenshot({ path: join(OUT, `${w}-built-${id}.png`) });
      const { pct, pair } = diff(
        join(OUT, `${w}-v3-${v3sel}.png`),
        join(OUT, `${w}-built-${id}.png`),
      );
      writeFileSync(join(OUT, `${w}-${id}-pair.png`), PNG.sync.write(pair));
      rows.push([w, `${id} (vs ${v3sel})`, pct]);
      console.log(`${w} ${id}: ${pct}% mismatch`);
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}

const html = `<!doctype html>
<meta charset="utf-8">
<title>design-diff · Rehabify v3</title>
<style>
body{font:14px/1.5 system-ui;margin:24px;background:#f5f8fa;color:#0e2233}
h1{font:700 28px system-ui}
h2{margin:40px 0 12px;font:700 20px system-ui}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
.pair img{width:100%;border:1px solid #dfe8ee;border-radius:8px}
label{font:600 12px monospace;color:#4a6274}
small{color:#4a6274}
</style>
<h1>Rehabify · design v3 diff</h1>
<p><small>Left: v3 reference. Right: built site. Mismatch % via pixelmatch (content differences like photos/[CONFIRM] chips are expected).</small></p>
${rows
  .map(
    ([w, name, pct]) =>
      `<h2>${w} · ${name} · ${pct}%</h2><div class="pair">
<label>v3</label><label>built</label>
<img src="${w}-v3-${name}.png"><img src="${w}-built-${name}.png">
</div>`,
  )
  .join("\n")}`;
writeFileSync(join(OUT, "index.html"), html);
console.log(`\nwrote ${OUT}/index.html with ${rows.length} pairs`);
