const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const cli = path.join(
  __dirname,
  "..",
  "node_modules",
  "@gltf-transform",
  "cli",
  "bin",
  "cli.js"
);
const modelsDir = path.join(__dirname, "..", "public", "models");
const targets = [
  "kicker/kicker_1.gltf",
  "kicker/kicker_2.gltf",
  "kicker/kicker_3.gltf",
  "kicker/kicker_4.gltf",
  "kicker/kicker_5.gltf",
  "kicker/kicker_6.gltf",
  "goalkeeper/goalkeeper_1.gltf",
];

for (const rel of targets) {
  const src = path.join(modelsDir, rel);
  const out = src.replace(/\.gltf$/, ".glb");
  const before = fs.statSync(src).size;
  execFileSync(process.execPath, [cli, "meshopt", src, out], {
    stdio: ["ignore", "ignore", "pipe"],
  });
  const after = fs.statSync(out).size;
  console.log(`${path.basename(rel)}: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB (${Math.round((1 - after / before) * 100)}%)`);
}
