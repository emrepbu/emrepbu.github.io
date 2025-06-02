export interface Route {
  path: string;
  title: string;
  icon: string;
  component: () => void;
}

export interface DynamicRoute {
  pattern: RegExp;
  title: (params: Record<string, string>) => string;
  component: (params: Record<string, string>) => void;
}

export class Router {
  private routes: Map<string, Route> = new Map();
  private dynamicRoutes: DynamicRoute[] = [];
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

  addDynamicRoute(route: DynamicRoute) {
    this.dynamicRoutes.push(route);
  }

  navigate(path: string, pushState: boolean = true) {
    // Try static routes first
    const route = this.routes.get(path);
    if (route) {
      this.handleStaticRoute(route, path, pushState);
      return;
    }

    // Try dynamic routes
    for (const dynamicRoute of this.dynamicRoutes) {
      const match = path.match(dynamicRoute.pattern);
      if (match) {
        this.handleDynamicRoute(dynamicRoute, path, match, pushState);
        return;
      }
    }

    // 404 - Route not found
    console.warn(`Route not found: ${path}`);
    this.container.innerHTML = `
      <div class="page-container">
        <div class="error-404">
          <h1>404</h1>
          <p>Sayfa bulunamadı</p>
          <a href="/" class="back-link">
            <i class="fas fa-home"></i> Ana Sayfaya Dön
          </a>
        </div>
      </div>
    `;
  }

  private handleStaticRoute(route: Route, path: string, pushState: boolean) {
    this.currentPath = path;
    
    if (pushState) {
      history.pushState({}, route.title, path);
    }
    
    document.title = `${route.title} | Emre Argana`;
    
    // Clear container and load new component
    this.container.innerHTML = '';
    route.component();
    
    // Update active nav item
    this.updateActiveNav(path);
  }

  private handleDynamicRoute(route: DynamicRoute, path: string, match: RegExpMatchArray, pushState: boolean) {
    this.currentPath = path;
    
    // Extract parameters from match
    const params: Record<string, string> = {};
    if (match.groups) {
      Object.assign(params, match.groups);
    } else if (match[1]) {
      params.slug = match[1];
    }
    
    const title = route.title(params);
    
    if (pushState) {
      history.pushState({}, title, path);
    }
    
    document.title = `${title} | Emre Argana`;
    
    // Clear container and load new component
    this.container.innerHTML = '';
    route.component(params);
    
    // Update active nav item for parent route
    const parentPath = path.split('/').slice(0, 2).join('/');
    this.updateActiveNav(parentPath);
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