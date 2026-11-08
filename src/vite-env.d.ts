/// <reference types="vite/client" />

/** Site photo URLs under public/images (see the site-images plugin in vite.config.ts). */
declare module "virtual:site-images" {
  const urls: string[];
  export default urls;
}

/** Size of each photo under public/images: [width, height, ...webpWidths]. */
declare module "virtual:image-sizes" {
  const sizes: Record<string, number[]>;
  export default sizes;
}

/** Blog articles from src/content/blog/*.md (see the blog-posts plugin in vite.config.ts). */
declare module "virtual:blog-posts" {
  const posts: import("./data/blog").BlogPost[];
  export default posts;
}
