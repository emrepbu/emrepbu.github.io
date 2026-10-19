import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { parse } from 'yaml'
import * as readingPaths from '../src/lib/reading-paths.mjs'
import {
  getPhysicsReadingSections,
  getPhysicsReadingStep,
  getMathReadingPosts,
  isPhysicsPost,
} from '../src/lib/reading-paths.mjs'

const root = new URL('../src/content/blog/', import.meta.url)
const posts = []
for (const directory of fs.readdirSync(root, { withFileTypes: true })) {
  if (!directory.isDirectory()) continue
  const file = new URL(`${directory.name}/index.mdx`, root)
  if (!fs.existsSync(file)) continue
  const body = fs.readFileSync(file, 'utf8')
  const data = parse(body.split('---')[1])
  posts.push({ id: directory.name, data, body })
}
const published = posts.filter((post) => !post.data.draft)
const flattened = (sections) =>
  sections.flatMap((section) => section.entries.map((entry) => entry.post))

// Date sorting would put the 2025 Planck article first; this must stay a learning path.
test('starts with measurement and ends with advanced Planck reading regardless of input order', () => {
  const sections = getPhysicsReadingSections([...published].reverse())
  const ordered = flattened(sections)
  assert.equal(ordered[0]?.id, 'fizikte-olcme-birimler-ve-modeller')
  assert.equal(
    ordered.at(-1)?.id,
    'the-planck-length-fundamental-limit-of-spacetime',
  )
  assert.deepEqual(
    sections.flatMap((s) => s.entries.map((e) => e.number)),
    ordered.map((_, i) => i + 1),
  )
})

test('includes every published physics or quantum article exactly once', () => {
  const expected = published
    .filter((p) =>
      p.data.tags?.some((t) =>
        ['physics', 'quantum', 'quantum-mechanics'].includes(t),
      ),
    )
    .map((p) => p.id)
    .sort()
  const actual = flattened(getPhysicsReadingSections(published)).map(
    (p) => p.id,
  )
  assert.equal(new Set(actual).size, actual.length)
  assert.deepEqual([...actual].sort(), expected)
})

test('existing physics references are available earlier in the reading path', () => {
  const ordered = flattened(getPhysicsReadingSections(published))
  assert(ordered.length > 0)
  const positions = new Map(ordered.map((p, i) => [p.id, i]))
  for (const [index, post] of ordered.entries()) {
    for (const [, id] of post.body.matchAll(
      /\]\(\/blog\/([^\s)#/]+)\/?(?:#[^)]*)?\)/g,
    )) {
      if (positions.has(id) && id !== post.id)
        assert(positions.get(id) < index, `${post.id} depends on later ${id}`)
    }
  }
})

test('next and previous links follow physics reading order with explicit boundaries', () => {
  const first = getPhysicsReadingStep('fizikte-olcme-birimler-ve-modeller')
  assert.equal(first?.previousId, null)
  assert.equal(first?.nextId, 'hareket-konum-hiz-ve-ivme')
  assert.equal(first?.number, 1)
  const last = getPhysicsReadingStep(
    'the-planck-length-fundamental-limit-of-spacetime',
  )
  assert.equal(last?.nextId, null)
  assert.equal(last?.previousId, 'berry-fazi-ve-topolojik-bantlar')
  assert.equal(
    getPhysicsReadingStep(last.previousId).nextId,
    'the-planck-length-fundamental-limit-of-spacetime',
  )
  assert.equal(getPhysicsReadingStep('kotlin-reflection'), null)
})

test('fails clearly instead of linking to a missing or unpublished physics article', () => {
  assert.throws(
    () =>
      getPhysicsReadingSections(
        published.filter((p) => p.id !== 'hareket-konum-hiz-ve-ivme'),
      ),
    /hareket-konum-hiz-ve-ivme/,
  )
  assert.throws(
    () =>
      getPhysicsReadingSections(
        published.map((p) =>
          p.id === 'hareket-konum-hiz-ve-ivme'
            ? { ...p, data: { ...p.data, draft: true } }
            : p,
        ),
      ),
    /hareket-konum-hiz-ve-ivme/,
  )
})

test('requires an explicit position for a newly added physics article', () => {
  assert.throws(
    () =>
      getPhysicsReadingSections([
        ...published,
        { id: 'yeni-fizik-yazisi', data: { tags: ['physics'] } },
      ]),
    /yeni-fizik-yazisi/,
  )
})

test('keeps quantum foundations while leaving software topics outside the physics path', () => {
  assert.equal(
    isPhysicsPost({ data: { tags: ['quantum', 'foundations'] } }),
    true,
  )
  assert.equal(
    isPhysicsPost({ data: { tags: ['quantum-RNG', 'cryptography'] } }),
    false,
  )
  assert.equal(isPhysicsPost({ data: {} }), false)
})

test('provides all mathematics support starting from numbers before geometry', () => {
  const math = getMathReadingPosts(published)
  assert.equal(math[0]?.id, 'sayi-dogrusu-yon-ve-uzaklik')
  assert.deepEqual(
    math.map((p) => p.id).sort(),
    published
      .filter((p) => p.data.tags?.includes('mathematics'))
      .map((p) => p.id)
      .sort(),
  )
  assert(
    math.findIndex((p) => p.id === 'cevre-alan-ve-hacim') <
      math.findIndex((p) => p.id === 'pisagor-teoremi'),
  )
  assert.throws(
    () =>
      getMathReadingPosts(
        published.filter((p) => p.id !== 'sayi-dogrusu-yon-ve-uzaklik'),
      ),
    /sayi-dogrusu-yon-ve-uzaklik/,
  )
})

test('mathematics has its own complete numbered sections, separate from physics', () => {
  const sections = readingPaths.getMathReadingSections([...published].reverse())
  const math = flattened(sections)
  assert.deepEqual(
    math.map((p) => p.id),
    getMathReadingPosts(published).map((p) => p.id),
  )
  assert.deepEqual(
    sections.flatMap((s) => s.entries.map((e) => e.number)),
    math.map((_, i) => i + 1),
  )
  const physicsIds = new Set(
    flattened(getPhysicsReadingSections(published)).map((p) => p.id),
  )
  assert(math.every((p) => !physicsIds.has(p.id)))
})

test('mathematics navigation stays on its own path at both ends and returns to its index', () => {
  const math = getMathReadingPosts(published)
  const first = readingPaths.getReadingStep(math[0].id)
  const last = readingPaths.getReadingStep(math.at(-1).id)
  assert.equal(first.previousId, null)
  assert.equal(first.nextId, math[1].id)
  assert.equal(first.path, '/matematik/')
  assert.equal(first.label, 'Matematik')
  assert.equal(first.number, 1)
  assert.equal(last.nextId, null)
  assert.equal(last.previousId, math.at(-2).id)
  assert.equal(last.number, math.length)
  assert.equal(
    readingPaths.getReadingStep('fizikte-olcme-birimler-ve-modeller').path,
    '/fizik/',
  )
  assert.equal(readingPaths.getReadingStep('unlisted-post'), null)
})

test('new mathematics articles require a position rather than disappearing from the page', () => {
  assert.throws(
    () =>
      readingPaths.getMathReadingSections([
        ...published,
        { id: 'yeni-matematik-yazisi', data: { tags: ['mathematics'] } },
      ]),
    /yeni-matematik-yazisi/,
  )
})

test('computer and software topics have their own complete path, including entropy', () => {
  const software = flattened(readingPaths.getSoftwareReadingSections(published))
  assert.equal(software[0].id, 'kotlin-nullable')
  assert(software.some((p) => p.id === 'sources-of-technological-entropy'))
  assert.deepEqual(
    software.map((p) => p.id).sort(),
    published
      .filter((p) =>
        p.data.tags?.some((tag) =>
          [
            'software',
            'kotlin',
            'android',
            'cryptography',
            'security',
          ].includes(tag),
        ),
      )
      .map((p) => p.id)
      .sort(),
  )
  const first = readingPaths.getReadingStep(software[0].id)
  assert.equal(first.previousId, null)
  assert.equal(first.path, '/yazilim/')
  assert.equal(first.nextId, 'kotlin-reflection')
  assert.equal(readingPaths.getReadingStep(software.at(-1).id).nextId, null)
  assert.throws(
    () =>
      readingPaths.getSoftwareReadingSections([
        ...published,
        { id: 'yeni-yazilim-yazisi', data: { tags: ['software'] } },
      ]),
    /yeni-yazilim-yazisi/,
  )
})

test('the three pages account for every current article exactly once', () => {
  const ids = [
    getPhysicsReadingSections,
    readingPaths.getMathReadingSections,
    readingPaths.getSoftwareReadingSections,
  ].flatMap((getSections) => flattened(getSections(published)).map((p) => p.id))
  assert.equal(new Set(ids).size, ids.length)
  assert.deepEqual([...ids].sort(), published.map((p) => p.id).sort())
})
