import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blogs',
    loadComponent: () => import('./features/blogs/blogs.component').then(m => m.BlogsComponent)
  },
  {
    path: 'blogs/:slug',
    loadComponent: () => import('./features/blogs/blog-detail.component').then(m => m.BlogDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
