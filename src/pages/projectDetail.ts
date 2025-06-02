import { getProjectBySlug } from '../utils/contentLoader.js';
import { formatDate } from '../utils/markdown.js';

export function createProjectDetailPage(slug: string): string {
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return `
      <div class="page-container">
        <div class="error-404">
          <h1>404</h1>
          <p>Proje bulunamadı</p>
          <a href="/projects" class="back-link">
            <i class="fas fa-arrow-left"></i> Tüm Projelere Dön
          </a>
        </div>
      </div>
    `;
  }

  const { frontmatter, html } = project;

  return `
    <div class="project-detail-page">
      <div class="project-detail-main-container">
        <header class="project-detail-header">
          <div class="project-breadcrumb">
            <a href="/" class="breadcrumb-link">Ana Sayfa</a>
            <span class="breadcrumb-separator">/</span>
            <a href="/projects" class="breadcrumb-link">Projelerim</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${frontmatter.title}</span>
          </div>
          
          <div class="project-detail-hero">
            <div class="project-hero-content">
              <h1 class="project-detail-title">${frontmatter.title}</h1>
              
              <p class="project-detail-description">${frontmatter.description}</p>
              
              <div class="project-detail-meta">
                <div class="meta-item">
                  <i class="fas fa-calendar"></i>
                  <span>${formatDate(frontmatter.date)}</span>
                </div>
                ${frontmatter.featured ? `
                  <div class="meta-item featured">
                    <i class="fas fa-star"></i>
                    <span>Öne Çıkan Proje</span>
                  </div>
                ` : ''}
              </div>
              
              <div class="project-detail-actions">
                ${frontmatter.demoUrl ? `
                  <a href="${frontmatter.demoUrl}" class="project-action-btn primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Canlı Demo</span>
                  </a>
                ` : ''}
                ${frontmatter.githubUrl ? `
                  <a href="${frontmatter.githubUrl}" class="project-action-btn secondary" target="_blank">
                    <i class="fab fa-github"></i>
                    <span>Kaynak Kod</span>
                  </a>
                ` : ''}
              </div>
            </div>
            
            ${frontmatter.image ? `
              <div class="project-hero-image">
                <img src="${frontmatter.image}" alt="${frontmatter.title}" />
              </div>
            ` : `
              <div class="project-hero-placeholder">
                <i class="fas fa-code"></i>
              </div>
            `}
          </div>
        </header>

        <div class="project-detail-body">
          <aside class="project-detail-sidebar">
            <div class="sidebar-sticky">
              <div class="sidebar-section">
                <h3 class="sidebar-title">Teknolojiler</h3>
                <div class="tech-stack">
                  ${frontmatter.technologies.map((tech: string) => `
                    <div class="tech-item">
                      <i class="fas fa-check-circle"></i>
                      <span>${tech}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
              
              <div class="sidebar-section">
                <h3 class="sidebar-title">Proje Bilgileri</h3>
                <div class="project-info">
                  <div class="info-item">
                    <i class="fas fa-code-branch"></i>
                    <span>Versiyon 1.0</span>
                  </div>
                  <div class="info-item">
                    <i class="fas fa-users"></i>
                    <span>Solo Proje</span>
                  </div>
                  <div class="info-item">
                    <i class="fas fa-check"></i>
                    <span>Tamamlandı</span>
                  </div>
                </div>
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

          <article class="project-detail-content">
            ${html}
          </article>
        </div>

        <footer class="project-detail-footer">
          <div class="footer-content">
            <div class="developer-info">
              <div class="developer-avatar">
                <i class="fas fa-laptop-code"></i>
              </div>
              <div class="developer-details">
                <h4>Emre Argana</h4>
                <p>Backend & Mobile Developer</p>
              </div>
            </div>
            
            <a href="/projects" class="back-button">
              <i class="fas fa-arrow-left"></i>
              <span>Tüm Projelere Dön</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  `;
}

export function initProjectDetailPage(_slug: string): void {
  const { gsap } = window as any;

  // Page entrance animation
  gsap.from('.project-detail-header', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power3.out' 
  });

  gsap.from('.project-detail-content', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.2,
    ease: 'power3.out' 
  });
  
  gsap.from('.project-detail-sidebar', { 
    x: -30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.3,
    ease: 'power3.out' 
  });
  
  gsap.from('.project-detail-footer', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.4,
    ease: 'power3.out' 
  });

  // Project image hover effect
  const heroImage = document.querySelector('.project-hero-image img');
  if (heroImage) {
    heroImage.addEventListener('mouseenter', () => {
      gsap.to(heroImage, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    heroImage.addEventListener('mouseleave', () => {
      gsap.to(heroImage, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }

  // Button hover animations
  const projectButtons = document.querySelectorAll('.project-action-btn');
  projectButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        y: -2,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
  
  // Share functionality
  const shareButtons = document.querySelectorAll('.share-btn-vertical');
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const shareType = button.getAttribute('data-share');
      const url = window.location.href;
      const title = document.querySelector('.project-detail-title')?.textContent || '';

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
}