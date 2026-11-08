/* Responsive <img> attributes for photos under public/images. The build
   writes WebP copies at several widths (see responsiveImages in
   vite.config.ts); this turns a photo URL into src + srcset + sizes and
   the intrinsic width/height, which lets the browser reserve the right
   space before the photo loads (no layout shift). */

import imageSizes from "virtual:image-sizes";

export interface ResponsiveImg {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * `sizes` describes how wide the image is drawn, e.g. "(min-width: 960px) 50vw, 100vw".
 * Unknown URLs (or dev builds, which have no WebP files) get a plain src.
 */
export function responsive(src: string, sizes = "100vw"): ResponsiveImg {
  const entry = imageSizes[src];
  if (!entry) return { src };
  const [width, height, ...widths] = entry;
  if (widths.length === 0) return { src, width, height };
  const srcSet = widths.map((w) => `${src.replace(/\.(jpe?g|png)$/i, `-${w}w.webp`)} ${w}w`).join(", ");
  return { src, srcSet, sizes, width, height };
}
