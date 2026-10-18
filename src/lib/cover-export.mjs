import { existsSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'

export const TOPIC_COVER_FOLDERS = {
  physics: 'fizik',
  math: 'matematik',
  software: 'yazilim',
}

/** @param {string} slug @param {string} [root] */
export function getTopicCoverAnimation(
  slug,
  root = resolve('src/assets/topics'),
) {
  const directory = join(root, slug, 'cover')
  const candidate = join(directory, 'index.html')
  if (!existsSync(candidate)) return undefined

  const coverRoot = realpathSync(directory)
  const indexFile = realpathSync(candidate)
  if (!indexFile.startsWith(coverRoot + sep) || !statSync(indexFile).isFile()) {
    throw new Error(`Konu kapağı kendi cover klasöründe olmalı: ${slug}`)
  }
  return readCoverAnimation(
    indexFile,
    `/blog-covers/konular/${slug}/index.html`,
    slug,
  )
}

/**
 * @param {string} indexFile
 * @param {string} src
 * @param {string} label
 * @returns {{src: string, directory: string, width: number, height: number}}
 */
export function readCoverAnimation(indexFile, src, label) {
  const directory = dirname(indexFile)
  const sceneSource = readFileSync(join(directory, 'scene.js'), 'utf8')
  // Read the exported JSON as data; never execute the scene's JavaScript.
  const match = sceneSource.match(
    /^\s*window\.jsGenScene\s*=\s*(\{[\s\S]*\})\s*;?\s*$/,
  )
  if (!match) {
    throw new Error(`Open Radiant sahne verisi okunamadı: ${label}/scene.js`)
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
    throw new Error(`Kapak animasyonunun sahne ölçüleri geçersiz: ${label}`)
  }

  return {
    src,
    directory,
    width,
    height,
  }
}
