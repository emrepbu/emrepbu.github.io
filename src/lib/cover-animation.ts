import {
  existsSync,
  readFileSync,
  readdirSync,
  realpathSync,
  statSync,
} from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import type { CollectionEntry } from 'astro:content'

export function getCoverAnimation(post: CollectionEntry<'blog'>) {
  const source = post.data.coverAnimation ?? './cover/index.html'
  if (!post.filePath) {
    if (!post.data.coverAnimation) return undefined
    throw new Error(`Kapak animasyonu için yazı dosyası bulunamadı: ${post.id}`)
  }

  const postDirectory = dirname(resolve(post.filePath))
  const candidate = resolve(postDirectory, source)
  // A complete export in the conventional folder takes priority over the image.
  if (!post.data.coverAnimation && !existsSync(candidate)) return undefined

  const coverRoot = realpathSync(join(postDirectory, 'cover'))
  const indexFile = realpathSync(candidate)
  if (!indexFile.startsWith(coverRoot + sep) || !statSync(indexFile).isFile()) {
    throw new Error(
      `Kapak animasyonu yazının cover klasöründe olmalı: ${post.id}`,
    )
  }

  const directory = dirname(indexFile)
  const sceneSource = readFileSync(join(directory, 'scene.js'), 'utf8')
  // Read the exported JSON as data; never execute the scene's JavaScript.
  const match = sceneSource.match(
    /^\s*window\.jsGenScene\s*=\s*(\{[\s\S]*\})\s*;?\s*$/,
  )
  if (!match) {
    throw new Error(`Open Radiant sahne verisi okunamadı: ${post.id}/scene.js`)
  }
  const scene = JSON.parse(match[1])
  const width = scene.size?.v1
  const height = scene.size?.v2
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(`Kapak animasyonunun sahne ölçüleri geçersiz: ${post.id}`)
  }

  return {
    src: `/blog-covers/${post.id}/index.html`,
    directory,
    width: width as number,
    height: height as number,
  }
}

export function getCoverAssets(directory: string) {
  const assets: { path: string; file: string }[] = []

  const visit = (current: string) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue
      const file = join(current, entry.name)
      if (entry.isDirectory()) visit(file)
      // Symlinks are not exported, so unrelated files cannot be published.
      else if (entry.isFile()) {
        assets.push({
          path: relative(directory, file).split(sep).join('/'),
          file,
        })
      }
    }
  }

  visit(directory)
  return assets
}
