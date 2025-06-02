import { 
  parseMarkdown, 
  createSlug, 
  sortByDate, 
  filterDrafts,
  type ContentItem,
  type ProjectFrontMatter,
  type ArticleFrontMatter
} from './markdown.js';

export type { ContentItem, ProjectFrontMatter, ArticleFrontMatter };

// Import all markdown files using Vite's glob import
const projectFiles = import.meta.glob('/content/projects/*.md', { query: '?raw', import: 'default', eager: true });
const articleFiles = import.meta.glob('/content/articles/*.md', { query: '?raw', import: 'default', eager: true });

export function loadProjects(): ContentItem<ProjectFrontMatter>[] {
  const projects: ContentItem<ProjectFrontMatter>[] = [];
  
  for (const [path, content] of Object.entries(projectFiles)) {
    const filename = path.split('/').pop() || '';
    const slug = createSlug(filename);
    const parsed = parseMarkdown<ProjectFrontMatter>(content as string);
    
    projects.push({
      slug,
      ...parsed
    });
  }
  
  return sortByDate(filterDrafts(projects));
}

export function loadArticles(): ContentItem<ArticleFrontMatter>[] {
  const articles: ContentItem<ArticleFrontMatter>[] = [];
  
  for (const [path, content] of Object.entries(articleFiles)) {
    const filename = path.split('/').pop() || '';
    const slug = createSlug(filename);
    const parsed = parseMarkdown<ArticleFrontMatter>(content as string);
    
    articles.push({
      slug,
      ...parsed
    });
  }
  
  return sortByDate(filterDrafts(articles));
}

export function getProjectBySlug(slug: string): ContentItem<ProjectFrontMatter> | undefined {
  const projects = loadProjects();
  return projects.find(project => project.slug === slug);
}

export function getArticleBySlug(slug: string): ContentItem<ArticleFrontMatter> | undefined {
  const articles = loadArticles();
  return articles.find(article => article.slug === slug);
}

export function getRelatedProjects(currentSlug: string, technologies: string[], limit = 3): ContentItem<ProjectFrontMatter>[] {
  const projects = loadProjects();
  
  return projects
    .filter(project => project.slug !== currentSlug)
    .map(project => ({
      project,
      score: project.frontmatter.technologies.filter(tech => 
        technologies.includes(tech)
      ).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.project);
}

export function getRelatedArticles(currentSlug: string, tags: string[], limit = 3): ContentItem<ArticleFrontMatter>[] {
  const articles = loadArticles();
  
  return articles
    .filter(article => article.slug !== currentSlug)
    .map(article => ({
      article,
      score: article.frontmatter.tags.filter(tag => 
        tags.includes(tag)
      ).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
}