/** @param {string} html */
export function resolveCoverAssetUrls(html) {
  // /open-radiant/ belongs to a separate GitHub Pages project site.
  // Support lightweight exports downloaded before the shared path moved.
  return html.replace(
    /(\b(?:src|href)\s*=\s*["'])\/open-radiant\/v1\//gi,
    '$1/blog-assets/open-radiant/v1/',
  )
}
