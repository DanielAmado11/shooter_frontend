const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..", "public", "images");
const files = [];

function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(png|jpe?g)$/i.test(f)) files.push(p);
  }
}
walk(root);

function ruleFor(name) {
  const base = name.toLowerCase();
  if (base.includes("_body.jpg"))
    return { max: 1100, jpegQ: 80, png: false, palette: false };
  if (/^kicker_\d\.jpg$/.test(base))
    return { max: 800, jpegQ: 80, png: false, palette: false };
  if (base === "play_backgrund.jpg")
    return { max: 1920, jpegQ: 82, png: false, palette: false };
  if (base === "gameplay.png")
    return { max: 1600, jpegQ: 0, png: false, palette: false, webpQ: 82 };
  if (base === "edit_avatar.png")
    return { max: 1080, jpegQ: 0, png: false, palette: false, webpQ: 85 };
  if (base.includes("_small.png"))
    return { max: 0, jpegQ: 0, png: true, palette: true };
  if (base.startsWith("kicker_") && base.endsWith(".png"))
    return { max: 1024, jpegQ: 0, png: true, palette: true };
  return null;
}

(async () => {
  let saved = 0;
  for (const p of files) {
    const name = path.basename(p);
    const rule = ruleFor(name);
    if (!rule) continue;
    const before = fs.statSync(p).size;
    let img = sharp(p);
    if (rule.max) {
      const meta = await sharp(p).metadata();
      if (meta.width > rule.max || meta.height > rule.max) {
        img = img.resize({ width: rule.max, height: rule.max, fit: "inside", withoutEnlargement: true, kernel: "lanczos3" });
      }
    }
    const tmp = (rule.webpQ ? p.replace(/\.png$/i, ".webp") : p) + ".tmp";
    if (rule.webpQ) {
      img = img.webp({ quality: rule.webpQ, alphaQuality: 90, effort: 5 });
    } else if (rule.png) {
      img = img.png({ compressionLevel: 9, adaptiveFiltering: true, palette: rule.palette, quality: 82 });
    } else {
      img = img.jpeg({ quality: rule.jpegQ, mozjpeg: true });
    }
    await img.toFile(tmp);
    const after = fs.statSync(tmp).size;
    if (after < before) {
      fs.renameSync(tmp, rule.webpQ ? tmp.replace(/\.tmp$/, "") : p);
      if (rule.webpQ) fs.unlinkSync(p);
      saved += before - after;
      console.log(`${path.relative(root, p)}: ${Math.round(before / 1024)} -> ${Math.round(after / 1024)} KB`);
    } else {
      fs.unlinkSync(tmp);
      console.log(`${path.relative(root, p)}: skip (no ahorra)`);
    }
  }
  console.log(`Total ahorrado: ${Math.round(saved / 1024)} KB`);
})();
