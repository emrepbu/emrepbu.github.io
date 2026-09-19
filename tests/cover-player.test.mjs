import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const source = readFileSync(
  new URL('../public/scripts/cover-player.js', import.meta.url),
  'utf8',
)

function player(
  search = '?preview=1',
  layers = [
    {
      def: 'cover',
      visible: 'visible',
      model: { heading: 'Başlık', atHeight: 976, logoShown: false },
    },
  ],
) {
  const frames = new Map()
  const listeners = new Map()
  const styles = []
  const document = {
    createElement: () => ({ textContent: '' }),
    head: { appendChild: (style) => styles.push(style.textContent) },
  }
  let nextId = 0
  const parent = {}
  const window = {
    parent,
    innerWidth: 512,
    innerHeight: 311,
    location: { search },
    jsGenScene: {
      size: { v1: 1607, v2: 976 },
      sizeRule: 'viewport:1607x976',
      origin: { v1: 0, v2: 0 },
      layers,
    },
    requestAnimationFrame(callback) {
      const id = ++nextId
      frames.set(id, callback)
      return id
    },
    cancelAnimationFrame(id) {
      frames.delete(id)
    },
    addEventListener(type, listener) {
      listeners.set(type, listener)
    },
  }
  runInNewContext(source, { window, document, URLSearchParams })
  return {
    window,
    frames,
    styles,
    visibility(playing, sender = parent) {
      listeners.get('message')({
        source: sender,
        data: { type: 'blog-cover:visibility', playing },
      })
    },
    tick(time = 16) {
      for (const [id, callback] of [...frames]) {
        if (!frames.delete(id)) continue
        callback(time)
      }
    },
  }
}

test('custom titles with a hidden logo suppress unused SVG backgrounds before startup', () => {
  const { styles } = player()
  assert.match(
    styles.join(''),
    /\.logo-layer[^}]+background-image:\s*none\s*!important/,
  )
  assert.match(
    styles.join(''),
    /\.product-name-layer[^}]+background-image:\s*none\s*!important/,
  )
})

test('visible logos and legacy SVG titles remain available', () => {
  const { styles } = player('', [
    { def: 'cover', visible: 'visible', model: { productShown: true } },
  ])
  assert.deepEqual(styles, [])
})

test('hidden layers do not require assets, but another visible cover can still use them', () => {
  const hidden = {
    def: 'cover',
    visible: 'hidden',
    model: { productShown: true, logoShown: true },
  }
  assert.match(player('', [hidden]).styles.join(''), /\.logo-layer/)
  const visible = { ...hidden, visible: 'locked' }
  assert.deepEqual(player('', [hidden, visible]).styles, [])
})

test('subtitle-only covers also replace the product SVG', () => {
  const { styles } = player('', [
    {
      def: 'cover',
      model: {
        productShown: true,
        heading: ' ',
        subheading: 'Alt başlık',
        logoShown: true,
      },
    },
  ])
  assert.match(styles.join(''), /\.product-name-layer/)
  assert.doesNotMatch(styles.join(''), /\.logo-layer/)
})

test('card previews render at their smaller viewport while preserving artwork data', () => {
  const { window } = player()
  assert.equal(window.jsGenScene.size.v1, 512)
  assert.equal(window.jsGenScene.size.v2, 311)
  assert.equal(window.jsGenScene.sizeRule, 'viewport:512x311')
  assert.equal(window.jsGenScene.layers[0].model.atHeight, 976)
  assert.equal(window.jsGenScene.layers[0].model.heading, 'Başlık')
})

test('detail covers retain the original export resolution', () => {
  const { window } = player('')
  assert.equal(window.jsGenScene.size.v1, 1607)
  assert.equal(window.jsGenScene.size.v2, 976)
})

test('offscreen frames stop drawing and resume queued work without restarting', () => {
  const p = player()
  const calls = []
  p.window.requestAnimationFrame((time) => calls.push(time))
  p.visibility(false)
  assert.equal(p.frames.size, 0)
  p.tick()
  assert.deepEqual(calls, [])
  p.visibility(true)
  p.tick(32)
  assert.deepEqual(calls, [32])
  p.tick(48)
  assert.deepEqual(calls, [32])
})

test('cancellation works while paused and callbacks can request the next frame', () => {
  const p = player()
  p.visibility(false)
  let calls = 0
  const cancelled = p.window.requestAnimationFrame(() => {
    calls += 100
  })
  p.window.cancelAnimationFrame(cancelled)
  p.window.requestAnimationFrame(() => {
    calls++
    p.window.requestAnimationFrame(() => {
      calls++
    })
  })
  p.visibility(true)
  p.tick()
  assert.equal(calls, 1)
  p.tick()
  assert.equal(calls, 2)
})

test('visibility commands from unrelated frames are ignored', () => {
  const p = player()
  let calls = 0
  p.window.requestAnimationFrame(() => {
    calls++
  })
  p.visibility(false, {})
  p.tick()
  assert.equal(calls, 1)
})

test('active cancellation and callback context retain native frame semantics', () => {
  const p = player()
  const cancelled = p.window.requestAnimationFrame(() => {
    assert.fail('A cancelled frame must not run')
  })
  p.window.cancelAnimationFrame(cancelled)
  assert.equal(p.frames.size, 0)
  let receiver
  p.window.requestAnimationFrame(function () {
    receiver = this
  })
  p.tick()
  assert.equal(receiver, p.window)
})
