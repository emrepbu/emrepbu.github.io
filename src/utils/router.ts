export interface Route {
  path: string;
  title: string;
  icon: string;
  component: () => void;
}

export class Router {
  private routes: Map<string, Route> = new Map();
  private currentPath: string = '/';
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname, false);
    });
  }

  addRoute(route: Route) {
    this.routes.set(route.path, route);
  }

  navigate(path: string, pushState: boolean = true) {
    const route = this.routes.get(path);
    if (!route) {
      console.warn(`Route not found: ${path}`);
      return;
    }

    this.currentPath = path;
    
    if (pushState) {
      history.pushState({}, route.title, path);
    }
    
    document.title = route.title;
    
    // Clear container and load new component
    this.container.innerHTML = '';
    route.component();
    
    // Update active nav item
    this.updateActiveNav(path);
  }

  private updateActiveNav(path: string) {
    const navItems = document.querySelectorAll('.nav-dropdown-item');
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-path') === path) {
        item.classList.add('active');
      }
    });
  }

  getCurrentPath(): string {
    return this.currentPath;
  }

  getRoutes(): Route[] {
    return Array.from(this.routes.values());
  }
}