import { getArticleBySlug } from '../utils/contentLoader.js';
import { formatDate } from '../utils/markdown.js';

export function createArticleDetailPage(slug: string): string {
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return `
      <div class="page-container">
        <div class="error-404">
          <h1>404</h1>
          <p>Makale bulunamadı</p>
          <a href="/articles" class="back-link">
            <i class="fas fa-arrow-left"></i> Tüm Yazılara Dön
          </a>
        </div>
      </div>
    `;
  }

  const { frontmatter, html } = article;

  return `
    <div class="article-detail-page">
      <article class="article-container">
        <header class="article-header">
          <div class="article-meta-detail">
            <span class="article-date">${formatDate(frontmatter.date)}</span>
            <span class="article-category">${frontmatter.category}</span>
            <span class="read-time"><i class="fas fa-clock"></i> ${frontmatter.readTime} dk okuma</span>
          </div>
          
          <h1 class="article-title">${frontmatter.title}</h1>
          
          <p class="article-description">${frontmatter.description}</p>
          
          <div class="article-tags">
            ${frontmatter.tags.map((tag: string) => `<span class="tag">#${tag}</span>`).join('')}
          </div>

          ${frontmatter.image ? `
            <div class="article-hero-image">
              <img src="${frontmatter.image}" alt="${frontmatter.title}" />
            </div>
          ` : ''}
        </header>

        <div class="article-content">
          ${html}
        </div>

        <footer class="article-footer">
          <div class="article-share">
            <h3>Bu yazıyı paylaş</h3>
            <div class="share-buttons">
              <button class="share-btn" data-share="twitter">
                <i class="fab fa-twitter"></i> Twitter
              </button>
              <button class="share-btn" data-share="linkedin">
                <i class="fab fa-linkedin"></i> LinkedIn
              </button>
              <button class="share-btn" data-share="copy">
                <i class="fas fa-link"></i> Linki Kopyala
              </button>
            </div>
          </div>

          <div class="article-navigation">
            <a href="/articles" class="back-to-articles">
              <i class="fas fa-arrow-left"></i> Tüm Yazılara Dön
            </a>
          </div>
        </footer>
      </article>

      <aside class="article-sidebar">
        <div class="sidebar-section">
          <h3>İçindekiler</h3>
          <div class="table-of-contents" id="toc">
            <!-- Will be populated by JS -->
          </div>
        </div>
      </aside>
    </div>
  `;
}

export function initArticleDetailPage(_slug: string): void {
  const { gsap } = window as any;

  // Page entrance animation
  gsap.from('.article-header', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power3.out' 
  });

  gsap.from('.article-content', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.2,
    ease: 'power3.out' 
  });

  gsap.from('.article-sidebar', { 
    x: 30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.4,
    ease: 'power3.out' 
  });

  // Generate table of contents
  generateTableOfContents();

  // Share functionality
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const shareType = button.getAttribute('data-share');
      const url = window.location.href;
      const title = document.querySelector('.article-title')?.textContent || '';

      switch (shareType) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'copy':
          navigator.clipboard.writeText(url).then(() => {
            // Show success message
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
            setTimeout(() => {
              button.innerHTML = originalText;
            }, 2000);
          });
          break;
      }
    });
  });

  // Highlight code blocks
  if ((window as any).Prism) {
    (window as any).Prism.highlightAll();
  }

  // Smooth scroll for table of contents
  document.querySelectorAll('#toc a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function generateTableOfContents(): void {
  const toc = document.getElementById('toc');
  const headings = document.querySelectorAll('.article-content h2, .article-content h3');
  
  if (!toc || headings.length === 0) return;

  const tocHTML = Array.from(headings).map((heading, index) => {
    const id = `heading-${index}`;
    heading.setAttribute('id', id);
    
    const level = heading.tagName.toLowerCase();
    const text = heading.textContent || '';
    
    return `<a href="#${id}" class="toc-link toc-${level}">${text}</a>`;
  }).join('');

  toc.innerHTML = tocHTML;

  // Highlight current section on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.toc-link').forEach(link => {
          link.classList.remove('active');
        });
        document.querySelector(`.toc-link[href="#${id}"]`)?.classList.add('active');
      }
    });
  }, { rootMargin: '-100px 0px -70% 0px' });

  headings.forEach(heading => observer.observe(heading));
}