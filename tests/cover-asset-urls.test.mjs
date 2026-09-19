import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveCoverAssetUrls } from '../src/lib/cover-asset-urls.mjs'

test('older blog exports load shared assets outside the Open Radiant project site', () => {
  const html = `<script src="./scene.js"></script>
<link href="/open-radiant/v1/index.css" rel="stylesheet">
<script async src='/open-radiant/v1/player.bundle.js'></script>`
  assert.equal(
    resolveCoverAssetUrls(html),
    `<script src="./scene.js"></script>
<link href="/blog-assets/open-radiant/v1/index.css" rel="stylesheet">
<script async src='/blog-assets/open-radiant/v1/player.bundle.js'></script>`,
  )
})

test('standalone exports keep their local asset paths', () => {
  const html =
    '<link href="./index.css"><script src="./player.bundle.js"></script>'
  assert.equal(resolveCoverAssetUrls(html), html)
})

test('current blog exports and unrelated text remain unchanged', () => {
  const html =
    '<link href="/blog-assets/open-radiant/v1/index.css"><p>/open-radiant/v1/</p>'
  assert.equal(resolveCoverAssetUrls(html), html)
})
