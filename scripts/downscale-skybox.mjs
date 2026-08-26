import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { EXRExporter } from "three/examples/jsm/exporters/EXRExporter.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "public", "skybox", "skybox.exr");
const BACKUP = path.join(__dirname, "..", "public", "skybox", "skybox_full.exr");
const SCALE = 0.5;

const buf = fs.readFileSync(SRC);
const parsed = new EXRLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const { width, height } = parsed;
const src = parsed.data;

const w2 = Math.round(width * SCALE);
const h2 = Math.round(height * SCALE);
const dst = new Uint16Array(w2 * h2 * 4);

for (let y = 0; y < h2; y++) {
  for (let x = 0; x < w2; x++) {
    for (let c = 0; c < 4; c++) {
      let sum = 0;
      for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          const sx = Math.min(x * 2 + dx, width - 1);
          const sy = Math.min(y * 2 + dy, height - 1);
          sum += THREE.DataUtils.fromHalfFloat(src[(sy * width + sx) * 4 + c]);
        }
      }
      dst[(y * w2 + x) * 4 + c] = THREE.DataUtils.toHalfFloat(sum / 4);
    }
  }
}

const outTex = new THREE.DataTexture(dst, w2, h2, THREE.RGBAFormat, THREE.HalfFloatType);
const out = new EXRExporter().parse(outTex, { compression: 3, type: THREE.HalfFloatType });

fs.writeFileSync(BACKUP, buf);
fs.writeFileSync(SRC, Buffer.from(out));
console.log(
  `skybox: ${width}x${height} (${Math.round(buf.length / 1024)} KB) -> ${w2}x${h2} (${Math.round(out.byteLength / 1024)} KB)`
);
console.log(`backup guardado en: ${BACKUP}`);
