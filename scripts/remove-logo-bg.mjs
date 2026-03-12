import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath  = join(__dirname, '../public/image/logo.jpeg');
const outputPath = join(__dirname, '../public/image/logo.png');

// Target yellow: #FFE500 → R=255, G=229, B=0
const TR = 255, TG = 229, TB = 0;

function dist(r, g, b) {
  return Math.sqrt((r - TR) ** 2 + (g - TG) ** 2 + (b - TB) ** 2);
}

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

for (let i = 0; i < width * height * channels; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const d = dist(r, g, b);

  // Fully transparent: pixel is close to yellow/cream background
  if (d < 55 || (r > 210 && g > 185 && b < 80 && r - b > 170)) {
    out[i + 3] = 0;
  } else if (d < 100) {
    // Soft edge blending
    out[i + 3] = Math.round(((d - 55) / 45) * 255);
  }
}

await sharp(out, { raw: { width, height, channels } })
  .png({ compressionLevel: 8 })
  .toFile(outputPath);

console.log(`✓ logo.png created (${width}×${height})`);
