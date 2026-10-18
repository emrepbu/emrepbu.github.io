import { existsSync, readdirSync, realpathSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import type { CollectionEntry } from 'astro:content'

import { readCoverAnimation } from './cover-export.mjs'
export { getTopicCoverAnimation, TOPIC_COVER_FOLDERS } from './cover-export.mjs'

export interface CoverAnimation {
  src: string
  directory: string
  width: number
  height: number
}

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

  return readCoverAnimation(
    indexFile,
    `/blog-covers/${post.id}/index.html`,
    post.id,
  )
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
