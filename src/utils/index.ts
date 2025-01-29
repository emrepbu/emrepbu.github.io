import type { CollectionEntry } from "astro:content";

const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL.substring(0, import.meta.env.BASE_URL.length - 1)
  : import.meta.env.BASE_URL;

export const generateURL = (path: string, base?: string | URL) => {
  const pathname = `${BASE_URL}/${trimSlash(path)}`;
  if (base) {
    return new URL(pathname, base);
  }
  return pathname;
};

export const trimSlash = (path: string) => {
  let res = path;
  if (res.endsWith("/")) {
    res = res.substring(0, res.length - 1);
  }
  if (res.startsWith("/")) {
    res = res.substring(1);
  }
  return res;
};

export const pathEqual = (a: string, b: string) => {
  return trimSlash(a) === trimSlash(b);
};

export function encodeTag(tag: string) {
  return tag
    .replace(/\//g, "%2F")
    .replace(/\s+/g, "-");
}

export function decodeTag(encodedTag: string) {
  return decodeURIComponent(encodedTag);
}

export const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const tags: string[] = posts
    .filter(post => !post.data.hide)
    .flatMap(post => post.data.tags)
    // 进行url编码
    .map(tag => encodeTag(tag));
  return [...new Set(tags)];
};

export const getPostsByTag = (
  posts: CollectionEntry<"blog">[],
  tag: string
) => {
  return posts.filter(
    post => !post.data.hide && post.data.tags.includes(decodeTag(tag))
  );
};
