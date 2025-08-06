import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllPosts } from '@/lib/data-utils'
import { getImage } from 'astro:assets'

export async function GET(context: APIContext) {
  try {
    const posts = await getAllPosts()
    const siteUrl = context.site ?? new URL(SITE.href)

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        if (!post.data.image) {
          return {
            ...post,
            optimizedImageSrc: null,
          }
        }

        const optimizedImage = await getImage({
          src: post.data.image,
          format: 'webp',
          width: 1200,
          quality: 80,
        })

        return {
          ...post,
          optimizedImageSrc: optimizedImage.src,
        }
      }),
    )

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: siteUrl.href,
      items: postsWithImages.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
        customData: post.optimizedImageSrc
          ? `<media:content
              url="${new URL(post.optimizedImageSrc, siteUrl).href}"
              medium="image"
              type="image/webp" />`
          : undefined,
      })),
      xmlns: {
        media: 'http://search.yahoo.com/mrss/',
      },
      customData: `<language>tr-tr</language>`,
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
