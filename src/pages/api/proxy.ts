export const prerender = false

import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const host = context.request.headers.get('host') || 'localhost:4321'
  const url = new URL(context.request.url, `http://${host}`)
  const target = url.searchParams.get('url')

  if (!target) {
    return new Response('Missing url param', { status: 400 })
  }

  try {
    const res = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    })
    const contentType = res.headers.get('content-type') || 'text/html'
    const data = await res.text()
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch {
    return new Response('Proxy error', { status: 500 })
  }
}
