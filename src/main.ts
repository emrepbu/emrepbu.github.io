import { gsap } from 'gsap';

import { CustomEase } from 'gsap/CustomEase';
import { CustomBounce } from 'gsap/CustomBounce';
import { CustomWiggle } from 'gsap/CustomWiggle';
import { RoughEase, ExpoScaleEase, SlowMo } from 'gsap/EasePack';

import { Draggable } from 'gsap/Draggable';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { EaselPlugin } from 'gsap/EaselPlugin';
import { Flip } from 'gsap/Flip';
import { GSDevTools } from 'gsap/GSDevTools';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { MotionPathHelper } from 'gsap/MotionPathHelper';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { Observer } from 'gsap/Observer';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';

import { Router } from './utils/router.js';
import { createNavbar, initNavbar } from './components/navbar.js';
import { createHomePage, initHomePage } from './pages/home.js';
import { createBasicPage, initBasicPage } from './pages/basic.js';
import { createProjectsPage, initProjectsPage } from './pages/projects.js';
import { createArticlesPage, initArticlesPage } from './pages/articles.js';
import { getText } from './utils/language.js';

// Make GSAP available globally for pages
(window as any).gsap = gsap;

gsap.registerPlugin(
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle,
);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const app = document.getElementById('app');
  const navbarContainer = document.getElementById('navbar-container');
  
  if (!app || !navbarContainer) return;

  // Initialize router
  const router = new Router(app);


  // Add routes
  router.addRoute({
    path: '/',
    title: 'Ana Sayfa',
    icon: 'fas fa-home',
    component: () => {
      app.innerHTML = createHomePage();
      initHomePage();
    }
  });

  router.addRoute({
    path: '/basic',
    title: getText('nav.basicAnimations'),
    icon: 'fas fa-play',
    component: () => {
      app.innerHTML = createBasicPage();
      initBasicPage();
    }
  });

  router.addRoute({
    path: '/projects',
    title: getText('nav.projects'),
    icon: 'fas fa-code',
    component: () => {
      app.innerHTML = createProjectsPage();
      initProjectsPage();
    }
  });

  router.addRoute({
    path: '/skills',
    title: getText('nav.skills'),
    icon: 'fas fa-tools',
    component: () => {
      app.innerHTML = `<div class="page-container"><div class="page-header"><h1>${getText('page.skills.title')}</h1><p>${getText('page.skills.desc')}</p></div></div>`;
    }
  });

  router.addRoute({
    path: '/articles',
    title: getText('nav.articles'),
    icon: 'fas fa-newspaper',
    component: () => {
      app.innerHTML = createArticlesPage();
      initArticlesPage();
    }
  });

  router.addRoute({
    path: '/tutorials',
    title: getText('nav.tutorials'),
    icon: 'fas fa-graduation-cap',
    component: () => {
      app.innerHTML = `<div class="page-container"><div class="page-header"><h1>${getText('page.tutorials.title')}</h1><p>${getText('page.tutorials.desc')}</p></div></div>`;
    }
  });

  router.addRoute({
    path: '/advanced',
    title: getText('nav.advanced'),
    icon: 'fas fa-rocket',
    component: () => {
      app.innerHTML = `<div class="page-container"><div class="page-header"><h1>${getText('page.advanced.title')}</h1><p>${getText('page.advanced.desc')}</p></div></div>`;
    }
  });

  router.addRoute({
    path: '/experiments',
    title: getText('nav.experiments'),
    icon: 'fas fa-atom',
    component: () => {
      app.innerHTML = `<div class="page-container"><div class="page-header"><h1>${getText('page.experiments.title')}</h1><p>${getText('page.experiments.desc')}</p></div></div>`;
    }
  });

  router.addRoute({
    path: '/about',
    title: getText('nav.about'),
    icon: 'fas fa-user',
    component: () => {
      app.innerHTML = `<div class="page-container"><div class="page-header"><h1>${getText('page.about.title')}</h1><p>${getText('page.about.desc')}</p></div></div>`;
    }
  });

  router.addRoute({
    path: '/contact',
    title: getText('nav.contactMe'),
    icon: 'fas fa-envelope',
    component: () => {
      app.innerHTML = `<div class="page-container"><div class="page-header"><h1>${getText('page.contact.title')}</h1><p>${getText('page.contact.desc')}</p></div></div>`;
    }
  });

  // Create and initialize navbar
  navbarContainer.innerHTML = createNavbar(router);
  initNavbar(router);

  // Navigate to current path or home
  const currentPath = window.location.pathname;
  router.navigate(currentPath === '/' ? '/' : currentPath, false);

  // Logo draggable functionality
  setTimeout(() => {
    const logo = document.querySelector('.logo');
    if (logo) {
      Draggable.create(logo, {
        type: 'x',
        bounds: '.navbar-container',
        inertia: true,
      });
    }
  }, 100);
}

