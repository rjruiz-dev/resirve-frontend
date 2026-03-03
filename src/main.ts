/**
 * Main Entry Point - ReSirve Frontend
 * 
 * Punto de entrada principal de la aplicación Angular.
 * Aquí se bootstrapea la aplicación con la configuración definida.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/**
 * Bootstrap de la aplicación
 * 
 * Angular 19 usa standalone components por defecto,
 * por lo que no necesitamos un AppModule.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Error al iniciar la aplicación:', err));