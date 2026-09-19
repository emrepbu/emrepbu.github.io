import { getCoverAnimation, getCoverAssets } from '@/lib/cover-animation'
import { getAllPostsAndSubposts } from '@/lib/data-utils'
import type { APIRoute, GetStaticPaths } from 'astro'
import { readFile } from 'node:fs/promises'
import { extname } from 'node:path'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPostsAndSubposts()
  return posts.flatMap((post) => {
    const animation = getCoverAnimation(post)
    if (!animation) return []
    return getCoverAssets(animation.directory).map((asset) => ({
      params: { path: `${post.id}/${asset.path}` },
      props: { file: asset.file, isEntry: asset.path === 'index.html' },
    }))
  })
}

const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.md': 'text/plain; charset=utf-8',
}

export const GET: APIRoute = async ({ props }) => {
  const file = props.file as string
  const source = await readFile(file)
  // Inline SVG/canvas layers add a baseline gap and an inner scrollbar.
  // Constrain the player document so wheel scrolling continues on the blog.
  const body = props.isEntry
    ? source.toString('utf8').replace(
        /<\/head>/i,
        `<style>
          html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; }
          canvas, svg { display: block; }
        </style>
        <script src="/scripts/cover-player.js"></script></head>`,
      )
    : new Uint8Array(source)
  return new Response(body, {
    headers: {
      'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream',
    },
  })
}
