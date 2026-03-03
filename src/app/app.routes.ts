/**
 * App Routes - ReSirve Frontend
 * 
 * Definición de todas las rutas de la aplicación.
 * Usa lazy loading para optimizar el bundle inicial.
 */

import { Routes } from '@angular/router';

/**
 * Rutas de la aplicación
 * 
 * Todas las rutas usan lazy loading para cargar los componentes
 * solo cuando son necesarios, optimizando el tiempo de carga inicial.
 * 
 * La sintaxis loadComponent() es parte de Angular 19 y permite
 * cargar componentes standalone de forma dinámica.
 */
export const routes: Routes = [
  // Ruta raíz - Home
  {
    path: '',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent),
    title: 'ReSirve - Productos Usados con Historia'
  },
  
  // Catálogo completo
  {
    path: 'catalogo',
    loadComponent: () => import('./features/catalog/catalog.component')
      .then(m => m.CatalogComponent),
    title: 'Catálogo - ReSirve'
  },
  
  // Productos por categoría
  {
    path: 'categoria/:slug',
    loadComponent: () => import('./features/category/category.component')
      .then(m => m.CategoryComponent),
    title: 'Categoría - ReSirve'
  },
  
  // Detalle de producto individual
  {
    path: 'productos/:slug',
    loadComponent: () => import('./features/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent),
    title: 'Producto - ReSirve'
  },
  
  // Búsqueda de productos
  {
    path: 'buscar',
    loadComponent: () => import('./features/search/search.component')
      .then(m => m.SearchComponent),
    title: 'Buscar - ReSirve'
  },
  
  // Página "Acerca de"
  {
    path: 'acerca-de',
    loadComponent: () => import('./features/about/about.component')
      .then(m => m.AboutComponent),
    title: 'Acerca de ReSirve'
  },
  
  // Página de contacto
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact.component')
      .then(m => m.ContactComponent),
    title: 'Contacto - ReSirve'
  },
  
  // ============================================
  // RUTAS DE ADMINISTRACIÓN (FASE 3)
  // ============================================
  // Estas rutas estarán protegidas por un guard en la Fase 3
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    title: 'Panel de Administración - ReSirve',
    // canActivate: [authGuard], // Se agregará en Fase 3
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
        title: 'Dashboard - Admin'
      },
      {
        path: 'productos',
        loadComponent: () => import('./features/admin/product-management/product-management.component')
          .then(m => m.ProductManagementComponent),
        title: 'Gestión de Productos - Admin'
      },
      {
        path: 'solicitudes',
        loadComponent: () => import('./features/admin/contact-requests/contact-requests.component')
          .then(m => m.ContactRequestsComponent),
        title: 'Solicitudes de Contacto - Admin'
      }
    ]
  },
  
  // ============================================
  // RUTA 404 - Not Found
  // ============================================
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found.component')
      .then(m => m.NotFoundComponent),
    title: 'Página no encontrada - ReSirve'
  },
  
  // Wildcard - Cualquier ruta no definida redirige a 404
  {
    path: '**',
    redirectTo: '404'
  }
];