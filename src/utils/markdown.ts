import { marked } from 'marked';
import matter from 'gray-matter';

export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  draft?: boolean;
  featured?: boolean;
  [key: string]: any;
}

export interface ProjectFrontMatter extends FrontMatter {
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface ArticleFrontMatter extends FrontMatter {
  category: string;
  tags: string[];
  readTime: number;
  image?: string;
}

export interface ContentItem<T extends FrontMatter> {
  slug: string;
  frontmatter: T;
  content: string;
  html: string;
}

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false
});

export function parseMarkdown<T extends FrontMatter>(content: string): Omit<ContentItem<T>, 'slug'> {
  const { data, content: markdownContent } = matter(content);
  const html = marked(markdownContent) as string;
  
  return {
    frontmatter: data as T,
    content: markdownContent,
    html
  };
}

export function createSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

export function sortByDate<T extends FrontMatter>(items: ContentItem<T>[]): ContentItem<T>[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function filterDrafts<T extends FrontMatter>(items: ContentItem<T>[]): ContentItem<T>[] {
  return items.filter(item => !item.frontmatter.draft);
}

export function filterFeatured<T extends FrontMatter>(items: ContentItem<T>[]): ContentItem<T>[] {
  return items.filter(item => item.frontmatter.featured);
}

// Helper to format dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Helper to calculate read time
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return readTime;
}