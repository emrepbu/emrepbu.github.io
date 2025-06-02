import { getText } from '../utils/language.js';

export function createHomePage(): string {
  return `
    <div class="home-page">
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">${getText('hero.greeting')}</h1>
          <p class="hero-subtitle">${getText('hero.subtitle')}</p>
          <div class="hero-description">
            <p>${getText('hero.description')}</p>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <h3>3+</h3>
              <p>${getText('hero.experience')}</p>
            </div>
            <div class="stat">
              <h3>15+</h3>
              <p>${getText('hero.projects')}</p>
            </div>
            <div class="stat">
              <h3>∞</h3>
              <p>${getText('hero.learning')}</p>
            </div>
          </div>
        </div>
        <div class="hero-animation">
          <div class="floating-elements">
            <div class="float-element element-1"></div>
            <div class="float-element element-2"></div>
            <div class="float-element element-3"></div>
            <div class="float-element element-4"></div>
            <div class="float-element element-5"></div>
          </div>
        </div>
      </section>

      <section class="projects-section">
        <h2>${getText('projects.title')}</h2>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-image">
              <div class="project-placeholder">
                <i class="fas fa-code"></i>
              </div>
            </div>
            <div class="project-content">
              <h3>${getText('projects.ecommerce.title')}</h3>
              <p>${getText('projects.ecommerce.description')}</p>
              <div class="project-tech">
                <span class="tech-tag">React</span>
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">GSAP</span>
              </div>
              <div class="project-links">
                <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>
                <a href="#" class="project-link"><i class="fab fa-github"></i> GitHub</a>
              </div>
            </div>
          </div>

          <div class="project-card">
            <div class="project-image">
              <div class="project-placeholder">
                <i class="fas fa-mobile-alt"></i>
              </div>
            </div>
            <div class="project-content">
              <h3>${getText('projects.portfolio.title')}</h3>
              <p>${getText('projects.portfolio.description')}</p>
              <div class="project-tech">
                <span class="tech-tag">Three.js</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">Vite</span>
              </div>
              <div class="project-links">
                <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>
                <a href="#" class="project-link"><i class="fab fa-github"></i> GitHub</a>
              </div>
            </div>
          </div>

          <div class="project-card">
            <div class="project-image">
              <div class="project-placeholder">
                <i class="fas fa-chart-line"></i>
              </div>
            </div>
            <div class="project-content">
              <h3>${getText('projects.dataviz.title')}</h3>
              <p>${getText('projects.dataviz.description')}</p>
              <div class="project-tech">
                <span class="tech-tag">D3.js</span>
                <span class="tech-tag">Vue.js</span>
                <span class="tech-tag">Chart.js</span>
              </div>
              <div class="project-links">
                <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>
                <a href="#" class="project-link"><i class="fab fa-github"></i> GitHub</a>
              </div>
            </div>
          </div>
        </div>
        <div class="section-footer">
          <a href="/projects" class="view-all-btn">${getText('projects.viewAll')} <i class="fas fa-arrow-right"></i></a>
        </div>
      </section>

      <section class="blog-section">
        <h2>${getText('blog.title')}</h2>
        <div class="blog-grid">
          <article class="blog-card">
            <div class="blog-meta">
              <span class="blog-date">15 Aralık 2024</span>
              <span class="blog-category">Web Development</span>
            </div>
            <h3>${getText('blog.post1.title')}</h3>
            <p>${getText('blog.post1.description')}</p>
            <a href="/articles/gsap-modern-animations" class="blog-link">Devamını Oku <i class="fas fa-arrow-right"></i></a>
          </article>

          <article class="blog-card">
            <div class="blog-meta">
              <span class="blog-date">08 Aralık 2024</span>
              <span class="blog-category">Frontend</span>
            </div>
            <h3>${getText('blog.post2.title')}</h3>
            <p>${getText('blog.post2.description')}</p>
            <a href="/articles/react-typescript-performance" class="blog-link">Devamını Oku <i class="fas fa-arrow-right"></i></a>
          </article>

          <article class="blog-card">
            <div class="blog-meta">
              <span class="blog-date">01 Aralık 2024</span>
              <span class="blog-category">Career</span>
            </div>
            <h3>${getText('blog.post3.title')}</h3>
            <p>${getText('blog.post3.description')}</p>
            <a href="/articles/frontend-journey-3-years" class="blog-link">Devamını Oku <i class="fas fa-arrow-right"></i></a>
          </article>
        </div>
        <div class="section-footer">
          <a href="/articles" class="view-all-btn">${getText('blog.viewAll')} <i class="fas fa-arrow-right"></i></a>
        </div>
      </section>
    </div>
  `;
}

export function initHomePage() {
  // Hero animations
  const { gsap } = window as any;

  // Animate hero content
  const tl = gsap.timeline();
  tl.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
    .from(
      '.hero-subtitle',
      { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5',
    )
    .from(
      '.hero-description',
      { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3',
    )
    .from(
      '.hero-stats .stat',
      { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.3',
    );

  // Floating elements animation
  const floatingElements = document.querySelectorAll('.float-element');
  floatingElements.forEach((element) => {
    gsap.set(element, {
      x: Math.random() * 300,
      y: Math.random() * 200,
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
    });

    gsap.to(element, {
      y: '+=20',
      duration: 2 + Math.random() * 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: Math.random() * 2,
    });

    gsap.to(element, {
      rotation: '+=360',
      duration: 10 + Math.random() * 10,
      repeat: -1,
      ease: 'none',
    });
  });

  // Project cards hover animation
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('.project-placeholder'), {
        rotation: 360,
        scale: 1.1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.project-placeholder'), {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });

  // Project cards entrance animation
  const projectCards2 = document.querySelectorAll('.project-card');
  projectCards2.forEach((card, index) => {
    gsap.fromTo(card, 
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Blog cards entrance animation
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach((card, index) => {
    gsap.fromTo(card,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Stats counter animation with ScrollTrigger
  const stats = document.querySelectorAll('.stat h3');
  stats.forEach((stat) => {
    const text = stat.textContent;
    if (text && text !== '∞') {
      const number = parseInt(text.replace('+', ''));
      gsap.fromTo(
        stat,
        { textContent: 0 },
        {
          textContent: number,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }
  });
}
