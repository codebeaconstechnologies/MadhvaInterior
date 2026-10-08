/// <reference types="vite/client" />

/** Site photo URLs under public/images (see the site-images plugin in vite.config.ts). */
declare module "virtual:site-images" {
  const urls: string[];
  export default urls;
}
