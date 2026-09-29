// One-off migration: pulls the original gallery photographs from the legacy
// wfolio site, normalises them (max 2400px long edge, mozjpeg q80) and writes
// a manifest with intrinsic dimensions, dominant colour and a tiny blur preview.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = JSON.parse(await fs.readFile(new URL("./source-galleries.json", import.meta.url), "utf8"));
const OUT = path.resolve("public/images");
const MAX = 2400;
const manifest = {};

async function fetchBuf(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url.startsWith("//") ? "https:" + url : url);
      if (!r.ok) throw new Error(r.status);
      return Buffer.from(await r.arrayBuffer());
    } catch (e) { if (i === tries - 1) throw e; }
  }
}

async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; await fn(items[k], k); } }));
}

for (const [slug, items] of Object.entries(src)) {
  await fs.mkdir(path.join(OUT, slug), { recursive: true });
  manifest[slug] = new Array(items.length);
  await pool(items, 8, async (it, k) => {
    const v = [...it.v].sort((a, b) => Math.max(a.w, a.h) - Math.max(b.w, b.h));
    const pick = v.find((x) => Math.max(x.w, x.h) >= MAX) ?? v[v.length - 1];
    const file = `${String(k + 1).padStart(2, "0")}.jpg`;
    const dest = path.join(OUT, slug, file);
    let meta;
    try { meta = await sharp(dest).metadata(); } catch {
      const buf = await fetchBuf(pick.src);
      const img = sharp(buf).rotate().resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true });
      await img.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(dest);
      meta = await sharp(dest).metadata();
    }
    const tiny = await sharp(dest).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
    const hash = await sharp(dest).resize(9, 8, { fit: "fill" }).grayscale().raw().toBuffer();
    let bits = "";
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += hash[y * 9 + x] > hash[y * 9 + x + 1] ? "1" : "0";
    manifest[slug][k] = {
      src: `/images/${slug}/${file}`, w: meta.width, h: meta.height, color: it.color,
      blur: `data:image/webp;base64,${tiny.toString("base64")}`, hash: bits,
    };
    process.stdout.write(".");
  });
  console.log(" " + slug, items.length);
}
await fs.writeFile("scripts/images.manifest.json", JSON.stringify(manifest, null, 1));
