import { getCollection, type CollectionEntry } from 'astro:content'
import { themeConfig } from '@/config'
import type { APIContext } from 'astro'

export async function generateRSS(context: APIContext) {
  const posts = await getCollection('posts')
  const filteredPosts = posts.filter((post: CollectionEntry<'posts'>) => !post.id.startsWith('_'))
  const sortedPosts = filteredPosts.sort(
    (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${themeConfig.site.title}</title>
    <link>${context.site}</link>
    <description>${themeConfig.site.description}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${context.site}/rss.xml" rel="self" type="application/rss+xml" />
    ${sortedPosts
      .map(
        (post: CollectionEntry<'posts'>) => `
      <item>
        <title><![CDATA[${post.data.title}]]></title>
        <link>${context.site}/${post.id}/</link>
        <guid>${context.site}/${post.id}/</guid>
        <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
        <content:encoded><![CDATA[${post.body}]]></content:encoded>
      </item>
    `
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}

export async function generateAtom(context: APIContext) {
  const posts = await getCollection('posts')
  const filteredPosts = posts.filter((post: CollectionEntry<'posts'>) => !post.id.startsWith('_'))
  const sortedPosts = filteredPosts.sort(
    (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )

  const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${themeConfig.site.title}</title>
  <subtitle>${themeConfig.site.description}</subtitle>
  <link href="${context.site}/atom.xml" rel="self" type="application/atom+xml" />
  <link href="${context.site}" />
  <id>${context.site}</id>
  <updated>${new Date().toISOString()}</updated>
  ${sortedPosts
    .map(
      (post: CollectionEntry<'posts'>) => `
    <entry>
      <title>${post.data.title}</title>
      <link href="${context.site}/${post.id}/" />
      <id>${context.site}/${post.id}/</id>
      <published>${post.data.pubDate.toISOString()}</published>
      <content type="html"><![CDATA[${post.body}]]></content>
    </entry>
  `
    )
    .join('')}
</feed>`

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}
