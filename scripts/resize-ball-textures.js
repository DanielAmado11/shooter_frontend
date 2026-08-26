const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const TARGETS = [
  { name: "ball_albedo", size: 512, quality: 82 },
  { name: "ball_normal", size: 512, quality: 80 },
  { name: "ball_roughness", size: 512, quality: 80 },
];

const ballDir = path.join(__dirname, "..", "public", "ball_texture");

(async () => {
  for (const target of TARGETS) {
    const src = path.join(ballDir, `${target.name}.jpg`);
    const tmp = path.join(ballDir, `${target.name}.tmp.jpg`);
    await sharp(src)
      .resize(target.size, target.size, { fit: "cover" })
      .jpeg({ quality: target.quality, mozjpeg: true })
      .toFile(tmp);
    fs.renameSync(tmp, src);
    const meta = await sharp(src).metadata();
    const kb = Math.round(fs.statSync(src).size / 1024);
    console.log(`${target.name}: ${meta.width}x${meta.height} -> ${kb} KB`);
  }
})();
