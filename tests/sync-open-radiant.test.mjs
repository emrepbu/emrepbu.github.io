import assert from 'node:assert/strict'
import {
  mkdtemp,
  mkdir,
  readFile,
  rm,
  writeFile,
  access,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { syncOpenRadiant } from '../scripts/sync-open-radiant.mjs'

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'radiant-sync-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const source = join(root, 'generator')
  const destination = join(root, 'blog')
  await mkdir(join(source, 'assets/fonts'), { recursive: true })
  const files = {
    'player.bundle.js': 'player with embedded fonts',
    'index.css': 'player styles',
    'LICENSE.md': 'artwork license',
    'assets/fonts/OFL.txt': 'font license',
    'assets/jetbrains.svg': '<svg>logo</svg>',
    'assets/kotlin-text.svg': '<svg>product</svg>',
  }
  for (const [file, contents] of Object.entries(files)) {
    await writeFile(join(source, file), contents)
  }
  return { source, destination, files }
}

test('shared runtime sync copies the player, styles and licenses without SVGs', async (t) => {
  const { source, destination, files } = await fixture(t)
  await syncOpenRadiant(source, destination)
  for (const [file, contents] of Object.entries(files)) {
    if (file.endsWith('.svg')) {
      await assert.rejects(access(join(destination, file)), { code: 'ENOENT' })
    } else {
      assert.equal(await readFile(join(destination, file), 'utf8'), contents)
    }
  }
})

test('missing player fails before changing an installed runtime', async (t) => {
  const { source, destination } = await fixture(t)
  await rm(join(source, 'player.bundle.js'))
  await mkdir(destination)
  await writeFile(join(destination, 'index.css'), 'existing styles')
  await assert.rejects(syncOpenRadiant(source, destination), { code: 'ENOENT' })
  assert.equal(
    await readFile(join(destination, 'index.css'), 'utf8'),
    'existing styles',
  )
  await assert.rejects(access(join(destination, 'LICENSE.md')), {
    code: 'ENOENT',
  })
})
