import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const IMAGE_FOLDERS = ["hero", "before-after", "gallery", "about"];
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Lists the site photos under public/images/{hero,before-after,gallery,about}
 * as `virtual:site-images` (an array of "/images/…" URLs), so photos can be
 * added or swapped by changing files only. See src/data/images.ts.
 */
function siteImages(): Plugin {
  const moduleId = "virtual:site-images";
  const resolvedId = "\0" + moduleId;
  const imagesDir = path.resolve(__dirname, "public/images");

  const listFiles = (dir: string): string[] =>
    fs.existsSync(dir)
      ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) return listFiles(full);
          return IMAGE_EXT.test(entry.name) ? [full] : [];
        })
      : [];

  const urls = () =>
    IMAGE_FOLDERS.flatMap((folder) => listFiles(path.join(imagesDir, folder))).map(
      (file) => "/images/" + path.relative(imagesDir, file).split(path.sep).join("/")
    );

  let outDir = "dist";

  return {
    name: "site-images",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    resolveId(id) {
      return id === moduleId ? resolvedId : undefined;
    },
    load(id) {
      return id === resolvedId ? `export default ${JSON.stringify(urls())};` : undefined;
    },
    // Dev: pick up added or removed photos without restarting the server.
    configureServer(server) {
      const refresh = (file: string) => {
        if (!file.startsWith(imagesDir)) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh);
      server.watcher.on("unlink", refresh);
    },
    // The folder guide is for editors, not visitors — keep it off the live site.
    closeBundle() {
      fs.rmSync(path.join(outDir, "images", "README.md"), { force: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteImages()],
  build: {
    target: "es2020",
    sourcemap: false,
  },
});
