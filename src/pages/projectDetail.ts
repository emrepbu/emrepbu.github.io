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
      <div class="project-detail-container">
        <header class="project-header">
          <div class="project-meta-detail">
            <span class="project-date">${formatDate(frontmatter.date)}</span>
            ${frontmatter.featured ? '<span class="featured-badge">Öne Çıkan</span>' : ''}
          </div>
          
          <h1 class="project-title">${frontmatter.title}</h1>
          
          <p class="project-description">${frontmatter.description}</p>
          
          <div class="project-tech-detail">
            ${frontmatter.technologies.map((tech: string) => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>

          <div class="project-links-detail">
            ${frontmatter.demoUrl ? `
              <a href="${frontmatter.demoUrl}" class="project-btn demo-btn" target="_blank">
                <i class="fas fa-external-link-alt"></i> Demo
              </a>
            ` : ''}
            ${frontmatter.githubUrl ? `
              <a href="${frontmatter.githubUrl}" class="project-btn github-btn" target="_blank">
                <i class="fab fa-github"></i> GitHub
              </a>
            ` : ''}
          </div>

          ${frontmatter.image ? `
            <div class="project-hero-image">
              <img src="${frontmatter.image}" alt="${frontmatter.title}" />
            </div>
          ` : ''}
        </header>

        <div class="project-content">
          ${html}
        </div>

        <footer class="project-footer">
          <div class="project-navigation">
            <a href="/projects" class="back-to-projects">
              <i class="fas fa-arrow-left"></i> Tüm Projelere Dön
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
  gsap.from('.project-header', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power3.out' 
  });

  gsap.from('.project-content', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8, 
    delay: 0.2,
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
  const projectButtons = document.querySelectorAll('.project-btn');
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

  // Highlight code blocks
  if ((window as any).Prism) {
    (window as any).Prism.highlightAll();
  }
}