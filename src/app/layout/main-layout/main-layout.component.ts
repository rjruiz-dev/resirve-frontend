/**
 * Main Layout Component - ReSirve Frontend
 * 
 * Layout principal que envuelve todas las páginas públicas.
 * Incluye navbar, contenido y footer.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet   
  ],
  template: `
    <!-- Loading Spinner Global -->
    <app-loading-spinner />
    
    <!-- Error Alert Global -->
    <app-error-alert />
    
    <!-- Layout Structure -->
    <div class="layout">
      <app-navbar />
      
      <main class="layout__content">
        <router-outlet />
      </main>
      
      <app-footer />
    </div>
  `,
  styles: [`
    @import 'variables';
    
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .layout__content {
      flex: 1;
      padding-top: $spacing-md;
      
      @media (min-width: $breakpoint-md) {
        padding-top: $spacing-xl;
      }
    }
  `]
})
export class MainLayoutComponent {}
