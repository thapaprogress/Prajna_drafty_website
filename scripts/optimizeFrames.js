import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "public", "frames");
const outputDir = path.join(root, "public", "optimized-frames");
const width = Number(process.env.FRAME_WIDTH || 1440);
const quality = Number(process.env.FRAME_QUALITY || 72);

await fs.mkdir(outputDir, { recursive: true });

const files = (await fs.readdir(inputDir))
  .filter((file) => /\.(jpe?g|png)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (!files.length) {
  throw new Error(`No source frames found in ${inputDir}`);
}

await Promise.all(
  files.map(async (file) => {
    const input = path.join(inputDir, file);
    const base = path.basename(file, path.extname(file));
    const output = path.join(outputDir, `${base}.webp`);

    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(output);
  })
);

console.log(`Optimized ${files.length} frames to ${outputDir}`);
