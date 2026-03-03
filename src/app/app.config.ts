/**
 * App Configuration - ReSirve Frontend
 * 
 * Configuración central de la aplicación Angular.
 * Define providers, interceptors, routing y otras configuraciones globales.
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

/**
 * Configuración de la aplicación
 * 
 * - provideZoneChangeDetection: Optimiza la detección de cambios
 * - provideRouter: Configura el routing con transiciones y binding de inputs
 * - provideHttpClient: Habilita HttpClient con fetch API
 * - provideAnimations: Habilita las animaciones de Angular
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Detección de cambios optimizada
    provideZoneChangeDetection({ 
      eventCoalescing: true 
    }),
    
    // Router con transiciones suaves entre páginas
    provideRouter(
      routes,
      withViewTransitions(),           // Transiciones suaves entre rutas
      withComponentInputBinding()      // Permite pasar params de ruta como inputs
    ),
    
    // HttpClient con interceptors (se agregarán en Bloque 2)
    provideHttpClient(
      withFetch(),                     // Usa Fetch API en lugar de XMLHttpRequest
      withInterceptors([
        // Los interceptors se agregarán en el Bloque 2:
        // - loadingInterceptor: Muestra spinner global
        // - errorInterceptor: Maneja errores HTTP
        // - authInterceptor: Agrega tokens (Fase 3)
      ])
    ),
    
    // Animaciones de Angular
    provideAnimations()
  ]
};