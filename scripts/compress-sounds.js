const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const ffmpegPath = require("ffmpeg-static");

const soundsDir = path.join(__dirname, "..", "public", "sounds");
const BITRATE = "128k";

const files = fs
  .readdirSync(soundsDir)
  .filter((f) => f.toLowerCase().endsWith(".mp3"));

for (const file of files) {
  const src = path.join(soundsDir, file);
  const tmp = path.join(soundsDir, `.${file}.tmp.mp3`);
  const before = fs.statSync(src).size;
  execFileSync(ffmpegPath, [
    "-y",
    "-i",
    src,
    "-codec:a",
    "libmp3lame",
    "-b:a",
    BITRATE,
    tmp,
  ]);
  fs.renameSync(tmp, src);
  const after = fs.statSync(src).size;
  console.log(`${file}: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`);
}
