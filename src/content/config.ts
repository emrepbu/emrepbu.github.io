import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { pageSchema, postSchema } from './schema'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages' }),
  schema: pageSchema,
})

const blog = defineCollection({
  type: 'content',
  schema: postSchema,
})

export const collections = {
  pages,
  blog,
}
