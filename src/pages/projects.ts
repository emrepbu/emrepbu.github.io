import { getText } from '../utils/language.js';
import { loadProjects, ContentItem, ProjectFrontMatter } from '../utils/contentLoader.js';
import { formatDate } from '../utils/markdown.js';

export function createProjectsPage(): string {
  const projects = loadProjects();
  const allTechnologies = [...new Set(projects.flatMap(p => p.frontmatter.technologies))];
  
  return `
    <div class="projects-page">
      <div class="page-header">
        <h1>${getText('page.projects.title')}</h1>
        <p>${getText('page.projects.desc')}</p>
      </div>
      
      <div class="projects-filter">
        <button class="filter-btn active" data-filter="all">Tümü</button>
        ${allTechnologies.map(tech => 
          `<button class="filter-btn" data-filter="${tech.toLowerCase()}">${tech}</button>`
        ).join('')}
      </div>
      
      <div class="projects-grid">
        ${projects.map(project => createProjectCard(project)).join('')}
      </div>
    </div>
  `;
}

function createProjectCard(project: ContentItem<ProjectFrontMatter>): string {
  const { frontmatter, slug } = project;
  
  return `
    <div class="project-card" data-technologies="${frontmatter.technologies.join(',').toLowerCase()}" data-project-slug="${slug}">
      <div class="project-image">
        ${frontmatter.image 
          ? `<img src="${frontmatter.image}" alt="${frontmatter.title}" />`
          : `<div class="project-placeholder">
              <i class="fas fa-code"></i>
            </div>`
        }
        ${frontmatter.featured ? '<div class="featured-badge">Öne Çıkan</div>' : ''}
      </div>
      <div class="project-content">
        <div class="project-meta">
          <span class="project-date">${formatDate(frontmatter.date)}</span>
        </div>
        <h3>${frontmatter.title}</h3>
        <p>${frontmatter.description}</p>
        <div class="project-tech">
          ${frontmatter.technologies.map((tech: string) => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${frontmatter.demoUrl ? `<a href="${frontmatter.demoUrl}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
          ${frontmatter.githubUrl ? `<a href="${frontmatter.githubUrl}" class="project-link" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
          <button class="project-link view-details" data-project-slug="${slug}">
            <i class="fas fa-info-circle"></i> Detaylar
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initProjectsPage(): void {
  const { gsap } = window as any;

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      projectCards.forEach((card, index) => {
        const technologies = card.getAttribute('data-technologies')?.toLowerCase() || '';
        const shouldShow = filter === 'all' || technologies.includes(filter || '');
        
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

  // View details functionality
  const viewDetailsButtons = document.querySelectorAll('.view-details');
  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectSlug = button.getAttribute('data-project-slug');
      if (projectSlug) {
        // Navigate to project detail page
        const router = (window as any).router;
        if (router) {
          router.navigate(`/projects/${projectSlug}`);
        }
      }
    });
  });

  // Set initial state for cards to ensure visibility
  gsap.set('.project-card', { opacity: 1 });

  // Entrance animations
  gsap.fromTo('.project-card', 
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

  // Project card hover animations
  projectCards.forEach(card => {
    const placeholder = card.querySelector('.project-placeholder');
    
    card.addEventListener('mouseenter', () => {
      if (placeholder) {
        gsap.to(placeholder, {
          rotation: 360,
          scale: 1.1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (placeholder) {
        gsap.to(placeholder, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });
}