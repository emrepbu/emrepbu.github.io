import { getText } from '../utils/language.js';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  date: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Ticaret Platformu',
    description: 'React ve Node.js kullanarak geliştirdiğim modern e-ticaret uygulaması. Responsive tasarım ve smooth animasyonlar.',
    technologies: ['React', 'Node.js', 'GSAP', 'MongoDB'],
    demoUrl: '#',
    githubUrl: '#',
    date: '2024-01-15',
    featured: true
  },
  {
    id: 'portfolio-dashboard',
    title: 'Portfolio Dashboard',
    description: 'Kişisel projelerimi sergilediğim interaktif dashboard. Three.js ile 3D elementler ve mikro animasyonlar.',
    technologies: ['Three.js', 'TypeScript', 'Vite', 'GSAP'],
    demoUrl: '#',
    githubUrl: '#',
    date: '2024-02-10',
    featured: true
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization Tool',
    description: 'D3.js kullanarak oluşturduğum veri görselleştirme aracı. Gerçek zamanlı grafikler ve interaktif dashboard.',
    technologies: ['D3.js', 'Vue.js', 'Chart.js', 'WebSocket'],
    demoUrl: '#',
    githubUrl: '#',
    date: '2024-03-05',
    featured: true
  }
];

export function createProjectsPage(): string {
  return `
    <div class="projects-page">
      <div class="page-header">
        <h1>${getText('page.projects.title')}</h1>
        <p>${getText('page.projects.desc')}</p>
      </div>
      
      <div class="projects-filter">
        <button class="filter-btn active" data-filter="all">Tümü</button>
        <button class="filter-btn" data-filter="react">React</button>
        <button class="filter-btn" data-filter="threejs">Three.js</button>
        <button class="filter-btn" data-filter="gsap">GSAP</button>
      </div>
      
      <div class="projects-grid">
        ${projects.map(project => createProjectCard(project)).join('')}
      </div>
    </div>
  `;
}

function createProjectCard(project: Project): string {
  return `
    <div class="project-card" data-technologies="${project.technologies.join(',').toLowerCase()}" data-project-id="${project.id}">
      <div class="project-image">
        <div class="project-placeholder">
          <i class="fas fa-code"></i>
        </div>
        ${project.featured ? '<div class="featured-badge">Öne Çıkan</div>' : ''}
      </div>
      <div class="project-content">
        <div class="project-meta">
          <span class="project-date">${formatDate(project.date)}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.demoUrl ? `<a href="${project.demoUrl}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
          <button class="project-link view-details" data-project-id="${project.id}">
            <i class="fas fa-info-circle"></i> Detaylar
          </button>
        </div>
      </div>
    </div>
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
      const projectId = button.getAttribute('data-project-id');
      if (projectId) {
        // Here you can implement project detail modal or navigation
        console.log('View project details:', projectId);
        // Example: showProjectModal(projectId);
      }
    });
  });

  // Entrance animations
  gsap.from('.project-card', {
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

  // Project card hover animations
  projectCards.forEach(card => {
    const placeholder = card.querySelector('.project-placeholder');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(placeholder, {
        rotation: 360,
        scale: 1.1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(placeholder, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}