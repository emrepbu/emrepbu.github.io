import { Router } from '../utils/router.js';
import { getText } from '../utils/language.js';

interface NavCategory {
  title: string;
  icon: string;
  items: Array<{
    path: string;
    title: string;
    icon: string;
  }>;
}

export function createNavbar(_router: Router): string {
  const categories: NavCategory[] = [
    {
      title: getText('nav.portfolio'),
      icon: 'fas fa-briefcase',
      items: [
        { path: '/projects', title: getText('nav.projects'), icon: 'fas fa-code' },
        { path: '/skills', title: getText('nav.skills'), icon: 'fas fa-tools' }
      ]
    },
    {
      title: getText('nav.blog'),
      icon: 'fas fa-blog',
      items: [
        { path: '/articles', title: getText('nav.articles'), icon: 'fas fa-newspaper' },
        { path: '/tutorials', title: getText('nav.tutorials'), icon: 'fas fa-graduation-cap' }
      ]
    },
    {
      title: getText('nav.gsapLab'),
      icon: 'fas fa-flask',
      items: [
        { path: '/basic', title: getText('nav.basicAnimations'), icon: 'fas fa-play' },
        { path: '/advanced', title: getText('nav.advanced'), icon: 'fas fa-rocket' },
        { path: '/experiments', title: getText('nav.experiments'), icon: 'fas fa-atom' }
      ]
    },
    {
      title: getText('nav.contact'),
      icon: 'fas fa-address-card',
      items: [
        { path: '/about', title: getText('nav.about'), icon: 'fas fa-user' },
        { path: '/contact', title: getText('nav.contactMe'), icon: 'fas fa-envelope' }
      ]
    }
  ];
  
  const navDropdowns = categories.map(category => `
    <div class="nav-dropdown">
      <div class="nav-dropdown-trigger">
        <i class="${category.icon}"></i>
        <span>${category.title}</span>
        <i class="fas fa-chevron-down dropdown-arrow"></i>
      </div>
      <div class="nav-dropdown-menu">
        ${category.items.map(item => `
          <div class="nav-dropdown-item" data-path="${item.path}">
            <i class="${item.icon}"></i>
            <span>${item.title}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
    <nav class="glass-navbar">
      <div class="navbar-container">
        <div class="logo-section">
          <div class="logo">
            <img src="/unnamed.png" alt="logo">
          </div>
          <div class="brand" data-path="/">
            <h1>Emre Argana</h1>
            <p>Blog & Portfolio</p>
          </div>
        </div>
        
        <div class="nav-items">
          ${navDropdowns}
        </div>
        
        <div class="nav-actions">
          <div class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbar(router: Router) {
  const navbar = document.querySelector('.glass-navbar');
  if (!navbar) return;

  const { gsap } = window as any;


  // Mobile menu toggle
  const toggle = navbar.querySelector('.nav-toggle');
  const navItems = navbar.querySelector('.nav-items');
  
  toggle?.addEventListener('click', () => {
    navItems?.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Dropdown functionality
  const dropdowns = navbar.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    const arrow = dropdown.querySelector('.dropdown-arrow');
    
    if (!trigger || !menu || !arrow) return;

    // Set initial state
    gsap.set(menu, { 
      opacity: 0, 
      y: -10, 
      visibility: 'hidden',
      scale: 0.95
    });

    let isOpen = false;
    let hoverTimeout: number;

    const openDropdown = () => {
      if (isOpen) return;
      isOpen = true;
      
      clearTimeout(hoverTimeout);
      
      gsap.set(menu, { visibility: 'visible' });
      gsap.to(menu, { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.3, 
        ease: 'back.out(1.7)' 
      });
      gsap.to(arrow, { 
        rotation: 180, 
        duration: 0.3, 
        ease: 'power2.out' 
      });
      
      dropdown.classList.add('active');
    };

    const closeDropdown = () => {
      if (!isOpen) return;
      isOpen = false;
      
      gsap.to(menu, { 
        opacity: 0, 
        y: -10, 
        scale: 0.95,
        duration: 0.2, 
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { visibility: 'hidden' })
      });
      gsap.to(arrow, { 
        rotation: 0, 
        duration: 0.2, 
        ease: 'power2.in' 
      });
      
      dropdown.classList.remove('active');
    };

    // Mouse events
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      openDropdown();
    });

    dropdown.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(closeDropdown, 100);
    });

    // Touch events for mobile
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      // On mobile, handle differently
      if (window.innerWidth <= 1024) {
        if (isOpen) {
          closeDropdown();
        } else {
          // Close other dropdowns first
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              const otherMenu = otherDropdown.querySelector('.nav-dropdown-menu');
              const otherArrow = otherDropdown.querySelector('.dropdown-arrow');
              if (otherMenu && otherArrow) {
                gsap.set(otherMenu, { opacity: 0, visibility: 'hidden' });
                gsap.set(otherArrow, { rotation: 0 });
                otherDropdown.classList.remove('active');
              }
            }
          });
          
          // On mobile, show dropdown without animation
          gsap.set(menu, { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            visibility: 'visible' 
          });
          gsap.set(arrow, { rotation: 180 });
          dropdown.classList.add('active');
          isOpen = true;
        }
      } else {
        // Desktop behavior
        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      }
    });
  });

  // Home navigation (brand click)
  const brand = navbar.querySelector('.brand');
  brand?.addEventListener('click', () => {
    router.navigate('/');
    
    // Close all dropdowns
    dropdowns.forEach(dropdown => {
      const menu = dropdown.querySelector('.nav-dropdown-menu');
      const arrow = dropdown.querySelector('.dropdown-arrow');
      if (menu && arrow) {
        gsap.to(menu, { 
          opacity: 0, 
          y: -10, 
          scale: 0.95, 
          duration: 0.2,
          onComplete: () => gsap.set(menu, { visibility: 'hidden' })
        });
        gsap.to(arrow, { rotation: 0, duration: 0.2 });
        dropdown.classList.remove('active');
      }
    });
    
    navItems?.classList.remove('active');
    toggle?.classList.remove('active');
  });

  // Navigation click handlers
  const navItemElements = navbar.querySelectorAll('.nav-dropdown-item');
  navItemElements.forEach(item => {
    item.addEventListener('click', () => {
      const path = item.getAttribute('data-path');
      if (path) {
        router.navigate(path);
        
        // Close all dropdowns
        dropdowns.forEach(dropdown => {
          const menu = dropdown.querySelector('.nav-dropdown-menu');
          const arrow = dropdown.querySelector('.dropdown-arrow');
          if (menu && arrow) {
            gsap.to(menu, { 
              opacity: 0, 
              y: -10, 
              scale: 0.95, 
              duration: 0.2,
              onComplete: () => gsap.set(menu, { visibility: 'hidden' })
            });
            gsap.to(arrow, { rotation: 0, duration: 0.2 });
            dropdown.classList.remove('active');
          }
        });
        
        navItems?.classList.remove('active');
        toggle?.classList.remove('active');
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target as Node)) {
      dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.nav-dropdown-menu');
        const arrow = dropdown.querySelector('.dropdown-arrow');
        if (menu && arrow) {
          gsap.to(menu, { 
            opacity: 0, 
            y: -10, 
            scale: 0.95, 
            duration: 0.2,
            onComplete: () => gsap.set(menu, { visibility: 'hidden' })
          });
          gsap.to(arrow, { rotation: 0, duration: 0.2 });
          dropdown.classList.remove('active');
        }
      });
      navItems?.classList.remove('active');
      toggle?.classList.remove('active');
    }
  });

  // Update active state based on current route
  const updateActiveState = (currentPath: string) => {
    // Handle brand active state
    const brand = navbar.querySelector('.brand');
    if (brand) {
      if (currentPath === '/') {
        brand.classList.add('active');
      } else {
        brand.classList.remove('active');
      }
    }

    // Handle dropdown items active state
    navItemElements.forEach(item => {
      const path = item.getAttribute('data-path');
      if (path === currentPath) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  // Listen for route changes
  window.addEventListener('popstate', () => {
    updateActiveState(window.location.pathname);
  });

  // Set initial active state
  updateActiveState(window.location.pathname);

}

export function rebuildNavbar(router: Router) {
  const navbarContainer = document.getElementById('navbar-container');
  
  if (!navbarContainer) return;

  const { gsap } = window as any;
  
  // Animate out current navbar
  gsap.to('.glass-navbar', {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      // Rebuild navbar with new translations
      navbarContainer.innerHTML = createNavbar(router);
      
      // Animate in new navbar
      gsap.fromTo('.glass-navbar', 
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: 'power2.out',
          onComplete: () => {
            // Reinitialize navbar functionality
            initNavbar(router);
          }
        }
      );
    }
  });
}