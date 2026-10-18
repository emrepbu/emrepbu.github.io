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
import vm from 'node:vm'
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

function checkNativeMetaballsCallback(bundle) {
  const marker = 'informNativeMetaballsUpdate.subscribe('
  const start = bundle.indexOf(marker) + marker.length
  const end = bundle.indexOf(
    '):console.error("No port `informNativeMetaballsUpdate`',
    start,
  )
  assert(start >= marker.length && end > start, 'v1 callback must be present')
  const layers = {}
  const calls = []
  const updated = { updated: true }
  const callback = vm.runInNewContext(`(${bundle.slice(start, end)})`, {
    t: { layers: [{ def: 'native-metaballs' }] },
    c: { nativeMetaballs: () => true },
    f: layers,
    a: {
      update: (...args) => {
        calls.push(args)
        return updated
      },
    },
  })
  assert.doesNotThrow(
    callback,
    'import can notify before the first animation frame creates a renderer',
  )
  assert.equal(calls.length, 0)
  const previous = { size: [800, 600], model: {}, palette: [], stop() {} }
  layers[0] = previous
  callback()
  assert.equal(calls.length, 1)
  assert.deepEqual(calls[0], [previous.size, previous, previous.stop, 0])
  assert.equal(layers[0], updated)
}

test('installed cover player handles updates before and after the renderer exists', async () => {
  const bundle = await readFile(
    new URL(
      '../public/blog-assets/open-radiant/v1/player.bundle.js',
      import.meta.url,
    ),
    'utf8',
  )
  checkNativeMetaballsCallback(bundle)
})

test('sync retains the native renderer startup fix when importing the original v1 player', async (t) => {
  const { source, destination } = await fixture(t)
  const original =
    'n.ports.informNativeMetaballsUpdate?n.ports.informNativeMetaballsUpdate.subscribe(()=>{t.layers.forEach((n,r)=>{if(c.nativeMetaballs(n)){const n=f[r];f[r]=a.update(n.size,colors,n.metaballs)}})}):console.error("No port `informNativeMetaballsUpdate` was detected")'
  await writeFile(join(source, 'player.bundle.js'), original)
  await syncOpenRadiant(source, destination)
  checkNativeMetaballsCallback(
    await readFile(join(destination, 'player.bundle.js'), 'utf8'),
  )
})
