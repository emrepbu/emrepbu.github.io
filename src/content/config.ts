import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { feedLoader } from '@ascorbic/feed-loader'
import { githubReleasesLoader } from 'astro-loader-github-releases'
import { githubPrsLoader } from 'astro-loader-github-prs'
import { pageSchema, postSchema } from './schema'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages' }),
  schema: pageSchema,
})

const blog = defineCollection({
  type: 'content',
  schema: postSchema,
})

const feeds = defineCollection({
  loader: feedLoader({
    url: 'https://astro.build/rss.xml',
  }),
})

const releases = defineCollection({
  loader: githubReleasesLoader({
    loadMode: 'repoList',
    modeConfig: {
      repos: [
        'withastro/astro',
        'withastro/starlight',
        'lin-stephanie/astro-loaders',
        'lin-stephanie/astro-antfustyle-theme',
      ],
      monthsBack: 3,
      entryReturnType: 'byRelease',
    },
  }),
})

const prs = defineCollection({
  loader: githubPrsLoader({
    search:
      'repo:withastro/astro repo:withastro/starlight repo:lin-stephanie/astro-antfustyle-theme',
    monthsBack: 1,
  }),
})

export const collections = {
  pages,
  blog,
  feeds,
  releases,
  prs,
}
