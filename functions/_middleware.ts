/**
 * Sends visitors on the bare domain (madhvainteriors.com) to the canonical
 * www host with a permanent redirect, so search engines index one copy of
 * the site. Photos and built assets skip Functions entirely (see
 * public/_routes.json).
 */

const CANONICAL_HOST = "www.madhvainteriors.com";
const REDIRECT_HOSTS = new Set(["madhvainteriors.com"]);

export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
