import { getText } from '../utils/language.js';
import { loadArticles, ContentItem, ArticleFrontMatter } from '../utils/contentLoader.js';
import { formatDate } from '../utils/markdown.js';

export function createArticlesPage(): string {
  const articles = loadArticles();
  const categories = [...new Set(articles.map(article => article.frontmatter.category))];
  
  return `
    <div class="articles-page">
      <div class="page-header">
        <h1>${getText('page.articles.title')}</h1>
        <p>${getText('page.articles.desc')}</p>
      </div>
      
      <div class="articles-filter">
        <button class="filter-btn active" data-filter="all">Tümü</button>
        ${categories.map(category => 
          `<button class="filter-btn" data-filter="${category.toLowerCase()}">${category}</button>`
        ).join('')}
      </div>
      
      <div class="articles-grid">
        ${articles.map(article => createArticleCard(article)).join('')}
      </div>
    </div>
  `;
}

function createArticleCard(article: ContentItem<ArticleFrontMatter>): string {
  const { frontmatter, slug } = article;
  
  return `
    <article class="article-card" data-category="${frontmatter.category.toLowerCase()}" data-article-slug="${slug}">
      ${frontmatter.featured ? '<div class="featured-badge">Öne Çıkan</div>' : ''}
      ${frontmatter.image ? `
        <div class="article-image">
          <img src="${frontmatter.image}" alt="${frontmatter.title}" />
        </div>
      ` : ''}
      <div class="article-meta">
        <span class="article-date">${formatDate(frontmatter.date)}</span>
        <span class="article-category">${frontmatter.category}</span>
        <span class="read-time"><i class="fas fa-clock"></i> ${frontmatter.readTime} dk okuma</span>
      </div>
      <h3>${frontmatter.title}</h3>
      <p>${frontmatter.description}</p>
      <div class="article-tags">
        ${frontmatter.tags.map((tag: string) => `<span class="tag">#${tag}</span>`).join('')}
      </div>
      <div class="article-actions">
        <button class="article-link read-article" data-article-slug="${slug}">
          <i class="fas fa-book-open"></i> Oku
        </button>
        <button class="article-link share-article" data-article-slug="${slug}">
          <i class="fas fa-share"></i> Paylaş
        </button>
      </div>
    </article>
  `;
}

export function initArticlesPage(): void {
  const { gsap } = window as any;

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter articles
      articleCards.forEach((card, index) => {
        const category = card.getAttribute('data-category') || '';
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
          });
          (card as HTMLElement).style.display = 'block';
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              (card as HTMLElement).style.display = 'none';
            }
          });
        }
      });
    });
  });

  // Read article functionality
  const readButtons = document.querySelectorAll('.read-article');
  readButtons.forEach(button => {
    button.addEventListener('click', () => {
      const articleSlug = button.getAttribute('data-article-slug');
      if (articleSlug) {
        // Navigate to article detail page
        const router = (window as any).router;
        if (router) {
          router.navigate(`/articles/${articleSlug}`);
        }
      }
    });
  });

  // Share functionality
  const shareButtons = document.querySelectorAll('.share-article');
  shareButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const articleSlug = button.getAttribute('data-article-slug');
      if (articleSlug) {
        const url = `${window.location.origin}/articles/${articleSlug}`;
        
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Blog Yazısı',
              url: url
            });
          } catch (err) {
            console.log('Share cancelled or failed');
          }
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(url);
          // You can show a toast notification here
          console.log('URL copied to clipboard');
        }
      }
    });
  });

  // Set initial state for cards to ensure visibility
  gsap.set('.article-card', { opacity: 1 });

  // Entrance animations
  gsap.fromTo('.article-card', 
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    }
  );

  gsap.from('.filter-btn', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.3,
    ease: 'back.out(1.7)'
  });

  // Article card hover animations
  articleCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}