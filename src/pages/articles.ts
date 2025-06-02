import { getText } from '../utils/language.js';

export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  featured?: boolean;
  image?: string;
}

export const articles: Article[] = [
  {
    id: 'gsap-modern-animations',
    title: 'Modern JavaScript ile GSAP Animasyonları',
    description: 'GSAP kullanarak web sitelerinize profesyonel animasyonlar eklemenin modern yolları ve best practice\'ler...',
    category: 'Web Development',
    tags: ['GSAP', 'JavaScript', 'Animation', 'Frontend'],
    date: '2024-12-15',
    readTime: 8,
    featured: true
  },
  {
    id: 'react-typescript-performance',
    title: 'TypeScript ile React Performance Optimizasyonu',
    description: 'React uygulamalarında performansı artırmak için TypeScript\'ten nasıl faydalanabiliriz? Pratik örnekler...',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Performance', 'Optimization'],
    date: '2024-12-08',
    readTime: 12,
    featured: true
  },
  {
    id: 'frontend-journey-3-years',
    title: 'Frontend Developer Olarak 3 Yıllık Deneyimim',
    description: 'Frontend geliştirme alanında edindiğim deneyimler, karşılaştığım zorluklar ve öğrendiğim dersler...',
    category: 'Career',
    tags: ['Career', 'Frontend', 'Experience', 'Learning'],
    date: '2024-12-01',
    readTime: 6,
    featured: true
  }
];

export function createArticlesPage(): string {
  const categories = [...new Set(articles.map(article => article.category))];
  
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

function createArticleCard(article: Article): string {
  return `
    <article class="article-card" data-category="${article.category.toLowerCase()}" data-article-id="${article.id}">
      ${article.featured ? '<div class="featured-badge">Öne Çıkan</div>' : ''}
      <div class="article-meta">
        <span class="article-date">${formatDate(article.date)}</span>
        <span class="article-category">${article.category}</span>
        <span class="read-time"><i class="fas fa-clock"></i> ${article.readTime} dk okuma</span>
      </div>
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <div class="article-tags">
        ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
      </div>
      <div class="article-actions">
        <button class="article-link read-article" data-article-id="${article.id}">
          <i class="fas fa-book-open"></i> Oku
        </button>
        <button class="article-link share-article" data-article-id="${article.id}">
          <i class="fas fa-share"></i> Paylaş
        </button>
      </div>
    </article>
  `;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
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
      const articleId = button.getAttribute('data-article-id');
      if (articleId) {
        // Here you can implement article detail navigation
        console.log('Read article:', articleId);
        // Example: navigateToArticle(articleId);
      }
    });
  });

  // Share functionality
  const shareButtons = document.querySelectorAll('.share-article');
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const articleId = button.getAttribute('data-article-id');
      if (articleId) {
        // Simple share functionality
        const article = articles.find(a => a.id === articleId);
        if (article) {
          const url = `${window.location.origin}/articles/${articleId}`;
          if (navigator.share) {
            navigator.share({
              title: article.title,
              text: article.description,
              url: url
            });
          } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(url);
            // You can show a toast notification here
            console.log('URL copied to clipboard');
          }
        }
      }
    });
  });

  // Entrance animations
  gsap.from('.article-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  });

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