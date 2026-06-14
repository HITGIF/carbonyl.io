#!/usr/bin/env node
// Resize and re-encode images for the web.
//
// Usage:
//   yarn resize <path> [<path> ...]
//
// Where each path is either an image file or a directory (recursive).
// HEIC files are converted to JPG (originals removed).
// All matched images are downscaled in place to fit within MAX_DIMENSION on
// the longest edge (no upscaling), JPEG-encoded with mozjpeg @ Q85, EXIF
// stripped, EXIF orientation baked into pixels.

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const MAX_DIMENSION = 2400;
const QUALITY = 85;
const MATCH = /\.(jpe?g|png|heic)$/i;

const formatBytes = (n) => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
};

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (MATCH.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalSize = (await fs.stat(filePath)).size;

  // Step 1: read into a sharp-compatible buffer (decode HEIC if needed).
  let input;
  let outPath = filePath;
  let didConvertHeic = false;

  if (ext === ".heic") {
    const heicBuf = await fs.readFile(filePath);
    // Lossless PNG intermediate so we only JPEG-encode once.
    const pngBuf = await heicConvert({ buffer: heicBuf, format: "PNG" });
    input = Buffer.from(pngBuf);
    outPath = filePath.replace(/\.heic$/i, ".jpg");
    didConvertHeic = true;
  } else {
    input = await fs.readFile(filePath);
  }

  // Step 2: resize + encode.
  const pipeline = sharp(input).rotate().resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  });

  const meta = await sharp(input).metadata();
  const buf = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();

  // Step 3: write + clean up.
  await fs.writeFile(outPath, buf);
  if (didConvertHeic) {
    await fs.unlink(filePath);
  }

  const tag = didConvertHeic ? "HEIC→JPG" : "JPG";
  const dims = `${meta.width}×${meta.height}`;
  const before = formatBytes(originalSize);
  const after = formatBytes(buf.length);
  const ratio = ((1 - buf.length / originalSize) * 100).toFixed(0);
  console.log(`  ${tag}  ${path.relative(process.cwd(), outPath)}`);
  console.log(`        ${dims}  ${before} → ${after}  (-${ratio}%)`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: yarn resize <path> [<path>...]");
    process.exit(1);
  }

  const files = [];
  for (const arg of args) {
    const stat = await fs.stat(arg).catch(() => null);
    if (!stat) {
      console.error(`! ${arg}: not found`);
      continue;
    }
    if (stat.isDirectory()) {
      files.push(...(await walk(arg)));
    } else if (MATCH.test(arg)) {
      files.push(arg);
    }
  }

  if (files.length === 0) {
    console.error("no matching images found");
    process.exit(1);
  }

  console.log(`processing ${files.length} image${files.length === 1 ? "" : "s"}`);
  let failed = 0;
  for (const file of files) {
    try {
      await processFile(file);
    } catch (err) {
      failed++;
      console.error(`! ${file}: ${err.message ?? err}`);
    }
  }
  if (failed > 0) process.exit(1);
}

main();
