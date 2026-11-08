import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import sharp from "sharp";
import { Marked } from "marked";

const IMAGE_FOLDERS = ["hero", "before-after", "gallery", "about"];
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const imagesDir = path.resolve(__dirname, "public/images");

const listFiles = (dir: string, ext = IMAGE_EXT): string[] =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return listFiles(full, ext);
        return ext.test(entry.name) ? [full] : [];
      })
    : [];

const toUrl = (file: string) => "/images/" + path.relative(imagesDir, file).split(path.sep).join("/");

/** Reloads the dev server page when a file under `dir` is added, changed or removed. */
function watchDir(server: import("vite").ViteDevServer, dir: string, moduleId: string) {
  const refresh = (file: string) => {
    if (!file.startsWith(dir)) return;
    const mod = server.moduleGraph.getModuleById(moduleId);
    if (mod) server.moduleGraph.invalidateModule(mod);
    server.ws.send({ type: "full-reload" });
  };
  server.watcher.on("add", refresh);
  server.watcher.on("change", refresh);
  server.watcher.on("unlink", refresh);
}

/**
 * Lists the site photos under public/images/{hero,before-after,gallery,about}
 * as `virtual:site-images` (an array of "/images/…" URLs), so photos can be
 * added or swapped by changing files only. See src/data/images.ts.
 */
function siteImages(): Plugin {
  const moduleId = "virtual:site-images";
  const resolvedId = "\0" + moduleId;

  const urls = () => IMAGE_FOLDERS.flatMap((folder) => listFiles(path.join(imagesDir, folder))).map(toUrl);

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
      watchDir(server, imagesDir, resolvedId);
    },
    // The folder guide is for editors, not visitors — keep it off the live site.
    closeBundle() {
      fs.rmSync(path.join(outDir, "images", "README.md"), { force: true });
    },
  };
}

/* ---------------------------------------------------------------
   Responsive images. For every JPG/PNG under public/images the
   production build writes WebP copies at a few widths next to the
   original (photo.jpg → photo-480w.webp, photo-960w.webp, …), and
   `virtual:image-sizes` tells the app each photo's size and which
   widths exist, so <img> tags get a srcset (src/lib/images.ts).
   The original stays as the fallback `src`. Encoded files are
   cached in node_modules/.cache so rebuilds stay fast.
   --------------------------------------------------------------- */

const VARIANT_WIDTHS = [480, 960, 1600];
const MAX_WIDTH = 2000;
const RASTER = /\.(jpe?g|png)$/i;

/** The WebP widths generated for a photo `width` pixels wide. */
const variantWidths = (width: number) => [
  ...new Set([...VARIANT_WIDTHS.filter((w) => w < width), Math.min(width, MAX_WIDTH)]),
];

const variantPath = (file: string, width: number) => file.replace(RASTER, `-${width}w.webp`);

function responsiveImages(): Plugin {
  const moduleId = "virtual:image-sizes";
  const resolvedId = "\0" + moduleId;
  const cacheDir = path.resolve(__dirname, "node_modules/.cache/madhva-images");
  let isBuild = false;
  let isSsr = false;
  let outDir = "dist";

  async function sizes() {
    const entries = await Promise.all(
      listFiles(imagesDir, RASTER).map(async (file) => {
        const { width = 0, height = 0 } = await sharp(file).metadata();
        return [toUrl(file), [width, height, ...(isBuild ? variantWidths(width) : [])]] as const;
      })
    );
    return Object.fromEntries(entries);
  }

  return {
    name: "responsive-images",
    configResolved(config) {
      isBuild = config.command === "build";
      isSsr = Boolean(config.build.ssr);
      outDir = path.resolve(config.root, config.build.outDir);
    },
    resolveId(id) {
      return id === moduleId ? resolvedId : undefined;
    },
    async load(id) {
      if (id !== resolvedId) return undefined;
      // { "/images/a.jpg": [width, height, ...webpWidths] } — no widths in dev,
      // where the WebP files don't exist.
      return `export default ${JSON.stringify(await sizes())};`;
    },
    configureServer(server) {
      watchDir(server, imagesDir, resolvedId);
    },
    async closeBundle() {
      if (!isBuild || isSsr) return;
      const files = listFiles(path.join(outDir, "images"), RASTER);
      let written = 0;
      await Promise.all(
        files.map(async (file) => {
          const rel = path.relative(path.join(outDir, "images"), file);
          const source = path.join(imagesDir, rel);
          const stat = fs.statSync(source);
          const { width = 0 } = await sharp(source).metadata();
          for (const w of variantWidths(width)) {
            const key = `${rel.replace(/[\\/]/g, "__")}-${stat.size}-${stat.mtimeMs}-${w}.webp`;
            const cached = path.join(cacheDir, key);
            if (!fs.existsSync(cached)) {
              fs.mkdirSync(cacheDir, { recursive: true });
              await sharp(source).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(cached);
              written++;
            }
            fs.copyFileSync(cached, variantPath(file, w));
          }
        })
      );
      console.log(`responsive-images: WebP variants for ${files.length} photos (${written} newly encoded)`);
    },
  };
}

/* ---------------------------------------------------------------
   Blog. Each article is a Markdown file in src/content/blog/ with a
   small front-matter block (see src/content/blog/README.md).
   `virtual:blog-posts` exposes them, newest first, with the body
   already converted to HTML — no Markdown parser ships to browsers.
   --------------------------------------------------------------- */

function blogPosts(): Plugin {
  const moduleId = "virtual:blog-posts";
  const resolvedId = "\0" + moduleId;
  const blogDir = path.resolve(__dirname, "src/content/blog");
  const marked = new Marked({ gfm: true });

  function parse(file: string) {
    const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) throw new Error(`${path.basename(file)}: missing front matter (--- … ---)`);
    const meta: Record<string, string> = {};
    for (const line of match[1].split("\n")) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (kv) meta[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1");
    }
    for (const key of ["title", "description", "date", "image", "imageAlt"]) {
      if (!meta[key]) throw new Error(`${path.basename(file)}: front matter needs "${key}"`);
    }

    // "## Frequently asked questions" followed by "### Question" + answer
    // paragraphs becomes the FAQ list (shown as an accordion, and as
    // FAQPage structured data).
    let body = match[2].trim();
    const faqs: { question: string; answer: string }[] = [];
    const faqStart = body.search(/^## Frequently asked questions\s*$/im);
    if (faqStart !== -1) {
      const faqBlock = body.slice(faqStart).replace(/^## .*\n/, "");
      body = body.slice(0, faqStart).trim();
      for (const part of faqBlock.split(/^### /m).slice(1)) {
        const [question, ...answer] = part.split("\n");
        faqs.push({ question: question.trim(), answer: answer.join(" ").replace(/\s+/g, " ").trim() });
      }
    }

    const words = body.split(/\s+/).length;
    return {
      slug: path.basename(file, ".md"),
      title: meta.title,
      seoTitle: meta.seoTitle || meta.title,
      description: meta.description,
      date: meta.date,
      updated: meta.updated || meta.date,
      image: meta.image,
      imageAlt: meta.imageAlt,
      related: (meta.related || "").split(",").map((s) => s.trim()).filter(Boolean),
      readMinutes: Math.max(1, Math.round(words / 220)),
      html: marked.parse(body) as string,
      faqs,
    };
  }

  const bodyPrefix = "virtual:blog-body/";
  const allPosts = () =>
    listFiles(blogDir, /\.md$/i)
      .filter((file) => !/readme\.md$/i.test(file))
      .map(parse)
      .sort((a, b) => b.date.localeCompare(a.date));

  return {
    name: "blog-posts",
    resolveId(id) {
      if (id === moduleId) return resolvedId;
      if (id.startsWith(bodyPrefix)) return "\0" + id;
      return undefined;
    },
    load(id) {
      // The list (titles, dates, …) is small and ships with the app; each
      // article body is its own chunk, loaded only on that article's page.
      if (id === resolvedId) {
        const entries = allPosts().map(({ html: _html, ...meta }) => {
          const loader = `() => import(${JSON.stringify(bodyPrefix + meta.slug)}).then((m) => m.default)`;
          return `{ ...${JSON.stringify(meta)}, loadHtml: ${loader} }`;
        });
        return `export default [\n${entries.join(",\n")}\n];`;
      }
      if (id.startsWith("\0" + bodyPrefix)) {
        const slug = id.slice(1 + bodyPrefix.length);
        const post = allPosts().find((p) => p.slug === slug);
        if (!post) throw new Error(`No blog post "${slug}"`);
        return `export default ${JSON.stringify(post.html)};`;
      }
      return undefined;
    },
    configureServer(server) {
      watchDir(server, blogDir, resolvedId);
    },
  };
}

export default defineConfig({
  plugins: [react(), siteImages(), responsiveImages(), blogPosts()],
  build: {
    target: "es2020",
    sourcemap: false,
  },
});
