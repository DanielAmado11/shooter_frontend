const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { NodeIO } = require("@gltf-transform/core");
const { KHRTextureTransform } = require("@gltf-transform/extensions");

const MAX_DIM = 2048;
const WEBP_QUALITY = 78;
const SRC = path.join(__dirname, "..", "public", "models", "stadium", "stadium.gltf");
const OUT = path.join(__dirname, "..", "public", "models", "stadium", "stadium.glb");

(async () => {
  const io = new NodeIO();
  io.registerExtensions([KHRTextureTransform]);
  const doc = await io.read(SRC);
  const textures = doc.getRoot().listTextures();
  const report = [];
  const startTotal = fs.statSync(SRC).size;

  for (const texture of textures) {
    const mime = texture.getMimeType();
    const image = texture.getImage();
    const before = image.byteLength;
    let buf = image;

    const meta = await sharp(image).metadata();
    if ((meta.width || 0) > MAX_DIM || (meta.height || 0) > MAX_DIM) {
      const scale = MAX_DIM / Math.max(meta.width, meta.height);
      buf = await sharp(image)
        .resize(Math.round(meta.width * scale), Math.round(meta.height * scale), {
          fit: "inside",
          kernel: "lanczos3",
        })
        .toBuffer();
    }

    const webp = await sharp(buf)
      .webp({ quality: WEBP_QUALITY, alphaQuality: 85, effort: 4 })
      .toBuffer();

    if (webp.length < buf.length * 0.95) {
      texture.setImage(webp);
      texture.setMimeType("image/webp");
    } else {
      texture.setImage(buf);
      texture.setMimeType(mime);
    }
    report.push(
      `  ${mime} ${meta.width}x${meta.height} -> ${Math.round(before / 1024)} KB -> ${Math.round(texture.getImage().byteLength / 1024)} KB`
    );
  }

  await io.write(OUT, doc);
  const endTotal = fs.statSync(OUT).size;
  console.log(report.join("\n"));
  console.log(`Total: ${Math.round(startTotal / 1024)} KB -> ${Math.round(endTotal / 1024)} KB (${Math.round((1 - endTotal / startTotal) * 100)}% menos)`);
})();
