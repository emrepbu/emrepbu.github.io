import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm, realpath } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import * as covers from '../src/lib/cover-export.mjs'

async function fixture(t, slug = 'fizik') {
  const root = await mkdtemp(join(tmpdir(), 'topic-covers-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const directory = join(root, slug, 'cover')
  await mkdir(directory, { recursive: true })
  return { root, directory }
}

test('a topic without an export has no broken animation or empty cover frame', async (t) => {
  const { root } = await fixture(t)
  for (const slug of ['fizik', 'matematik', 'yazilim']) {
    assert.equal(covers.getTopicCoverAnimation(slug, root), undefined)
  }
})

test('each topic loads its own export and original aspect ratio', async (t) => {
  for (const [index, slug] of ['fizik', 'matematik', 'yazilim'].entries()) {
    const { root, directory } = await fixture(t, slug)
    await writeFile(join(directory, 'index.html'), '<html><head></head></html>')
    await writeFile(
      join(directory, 'scene.js'),
      `window.jsGenScene = ${JSON.stringify({ size: { v1: 1200 + index, v2: 630 } })};`,
    )
    const animation = covers.getTopicCoverAnimation(slug, root)
    assert.equal(animation.src, `/blog-covers/konular/${slug}/index.html`)
    assert.equal(animation.width, 1200 + index)
    assert.equal(animation.height, 630)
    assert.equal(animation.directory, await realpath(directory))
    assert.equal(
      covers.getTopicCoverAnimation(
        'fizik' === slug ? 'matematik' : 'fizik',
        root,
      ),
      undefined,
    )
  }
})

test('incomplete or invalid topic exports fail clearly without executing scene JavaScript', async (t) => {
  const { root, directory } = await fixture(t)
  await writeFile(join(directory, 'index.html'), '<html><head></head></html>')
  assert.throws(() => covers.getTopicCoverAnimation('fizik', root), /scene.js/)
  await writeFile(
    join(directory, 'scene.js'),
    'throw new Error("should not execute")',
  )
  assert.throws(
    () => covers.getTopicCoverAnimation('fizik', root),
    /sahne verisi okunamadı/,
  )
  await writeFile(
    join(directory, 'scene.js'),
    'window.jsGenScene = {"size":{"v1":0,"v2":630}};',
  )
  assert.throws(
    () => covers.getTopicCoverAnimation('fizik', root),
    /ölçüleri geçersiz/,
  )
})
