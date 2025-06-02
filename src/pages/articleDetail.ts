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
      <div class="article-detail-container">
        <header class="article-detail-header">
          <div class="article-breadcrumb">
            <a href="/" class="breadcrumb-link">Ana Sayfa</a>
            <span class="breadcrumb-separator">/</span>
            <a href="/articles" class="breadcrumb-link">Yazılarım</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${frontmatter.title}</span>
          </div>
          
          <h1 class="article-detail-title">${frontmatter.title}</h1>
          
          <div class="article-detail-meta">
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span>${formatDate(frontmatter.date)}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-folder"></i>
              <span>${frontmatter.category}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>${frontmatter.readTime} dk okuma</span>
            </div>
          </div>
          
          <p class="article-detail-description">${frontmatter.description}</p>
          
          ${frontmatter.image ? `
            <div class="article-detail-hero">
              <img src="${frontmatter.image}" alt="${frontmatter.title}" />
            </div>
          ` : ''}
        </header>

        <div class="article-detail-body">
          <aside class="article-detail-sidebar">
            <div class="sidebar-sticky">
              <div class="sidebar-section">
                <h3 class="sidebar-title">İçindekiler</h3>
                <nav class="toc" id="toc">
                  <!-- Will be populated by JS -->
                </nav>
              </div>
              
              <div class="sidebar-section">
                <h3 class="sidebar-title">Paylaş</h3>
                <div class="share-buttons-vertical">
                  <button class="share-btn-vertical" data-share="twitter" title="Twitter'da Paylaş">
                    <i class="fab fa-twitter"></i>
                  </button>
                  <button class="share-btn-vertical" data-share="linkedin" title="LinkedIn'de Paylaş">
                    <i class="fab fa-linkedin"></i>
                  </button>
                  <button class="share-btn-vertical" data-share="copy" title="Linki Kopyala">
                    <i class="fas fa-link"></i>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <article class="article-detail-content">
            ${html}
            
            <div class="article-detail-tags">
              <i class="fas fa-tags"></i>
              ${frontmatter.tags.map((tag: string) => `<span class="article-tag">#${tag}</span>`).join('')}
            </div>
          </article>
        </div>

        <footer class="article-detail-footer">
          <div class="footer-content">
            <div class="author-info">
              <div class="author-avatar">
                <i class="fas fa-user-circle"></i>
              </div>
              <div class="author-details">
                <h4>Emre Argana</h4>
                <p>Backend & Mobile Developer</p>
              </div>
            </div>
            
            <a href="/articles" class="back-button">
              <i class="fas fa-arrow-left"></i>
              <span>Tüm Yazılara Dön</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  `;
}

export function initArticleDetailPage(_slug: string): void {
  const { gsap } = window as any;

  // Page entrance animation
  gsap.from('.article-detail-header', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power3.out' 
  });

  gsap.from('.article-detail-content', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.2,
    ease: 'power3.out' 
  });

  gsap.from('.article-detail-sidebar', { 
    x: -30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.3,
    ease: 'power3.out' 
  });
  
  gsap.from('.article-detail-footer', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.4,
    ease: 'power3.out' 
  });

  // Generate table of contents
  generateTableOfContents();

  // Share functionality
  const shareButtons = document.querySelectorAll('.share-btn-vertical');
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const shareType = button.getAttribute('data-share');
      const url = window.location.href;
      const title = document.querySelector('.article-detail-title')?.textContent || '';

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
            button.classList.add('copied');
            const originalTitle = button.getAttribute('title') || '';
            button.setAttribute('title', 'Kopyalandı!');
            setTimeout(() => {
              button.classList.remove('copied');
              button.setAttribute('title', originalTitle);
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
  const headings = document.querySelectorAll('.article-detail-content h2, .article-detail-content h3');
  
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