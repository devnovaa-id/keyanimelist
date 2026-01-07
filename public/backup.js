const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, "backup.md");

function getFilesFromDir(dir, ext) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith(ext))
    .map(file => path.join(dir, file));
}

let output = "";

// ===== index.html =====
const indexPath = path.join(ROOT, "index.html");
if (fs.existsSync(indexPath)) {
  output += `//index.html\n\n`;
  output += fs.readFileSync(indexPath, "utf8") + "\n\n";
}

// ===== manifest.json =====
const manifestPath = path.join(ROOT, "manifest.json");
if (fs.existsSync(manifestPath)) {
  output += `//manifest.json\n\n`;
  output += fs.readFileSync(manifestPath, "utf8") + "\n\n";
}

// ===== sw.js =====
const swPath = path.join(ROOT, "sw.js");
if (fs.existsSync(swPath)) {
  output += `//sw.js\n\n`;
  output += fs.readFileSync(swPath, "utf8") + "\n\n";
}

// ===== css folder =====
const cssFiles = getFilesFromDir(path.join(ROOT, "css"), ".css");
for (const file of cssFiles) {
  output += `//css/${path.basename(file)}\n\n`;
  output += fs.readFileSync(file, "utf8") + "\n\n";
}

// ===== js folder =====
const jsFiles = getFilesFromDir(path.join(ROOT, "js"), ".js");
for (const file of jsFiles) {
  output += `//js/${path.basename(file)}\n\n`;
  output += fs.readFileSync(file, "utf8") + "\n\n";
}

// ===== write backup =====
fs.writeFileSync(OUTPUT, output, "utf8");
console.log("✅ Backup selesai → backup.md");