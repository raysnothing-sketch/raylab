import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const serverAppDir = path.join(rootDir, ".next", "server", "app");
const staticDir = path.join(rootDir, ".next", "static");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "cloudflare-dist");

console.log("📦 Preparing Cloudflare Pages deployment bundle...");

// 1. Clean distDir
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy static assets (_next/static)
const distNextStatic = path.join(distDir, "_next", "static");
fs.mkdirSync(path.join(distDir, "_next"), { recursive: true });
if (fs.existsSync(staticDir)) {
  fs.cpSync(staticDir, distNextStatic, { recursive: true });
  console.log("✔ Copied _next/static");
}

// 3. Copy public files
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
  console.log("✔ Copied public assets");
}

// 4. Copy and map HTML files for clean URLs
function copyHtmlFiles(dir, baseSub = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      copyHtmlFiles(fullPath, path.join(baseSub, entry.name));
    } else if (entry.name.endsWith(".html")) {
      const pageName = entry.name.replace(".html", "");
      if (pageName === "index") {
        const dest = path.join(distDir, baseSub, "index.html");
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(fullPath, dest);
      } else if (pageName === "_not-found" || pageName === "404") {
        fs.copyFileSync(fullPath, path.join(distDir, "404.html"));
      } else {
        // Create directory with index.html for clean URL (e.g. /raybot/index.html AND /raybot.html)
        const cleanDir = path.join(distDir, baseSub, pageName);
        fs.mkdirSync(cleanDir, { recursive: true });
        fs.copyFileSync(fullPath, path.join(cleanDir, "index.html"));
        // Also keep .html
        fs.copyFileSync(fullPath, path.join(distDir, baseSub, `${pageName}.html`));
      }
    }
  }
}

if (fs.existsSync(serverAppDir)) {
  copyHtmlFiles(serverAppDir);
  console.log("✔ Processed and mapped all HTML pages for clean URLs");
}

console.log("✨ Cloudflare Pages distribution ready in ./cloudflare-dist");
