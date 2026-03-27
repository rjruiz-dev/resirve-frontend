/**
 * Loading Spinner Component - ReSirve Frontend
 * 
 * Spinner de carga global que se muestra automáticamente
 * durante las peticiones HTTP (conectado al LoadingService).
 */

import { Component, inject } from '@angular/core';
import { LoadingService } from '@core/services';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  template: `
    @if (loadingService.isLoading()) {
      <div class="loading-overlay">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p class="loading-text">Cargando...</p>
        </div>
      </div>
    }
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';
    
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba($color-crema, 0.95);
      backdrop-filter: blur(4px);
      z-index: 9999;
      
      @include flex-center;
      
      animation: fadeIn 0.2s ease-in-out;
    }
    
    .loading-spinner {
      @include flex-column;
      align-items: center;
      gap: $spacing-lg;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba($color-terracota, 0.2);
      border-top-color: $color-terracota;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .loading-text {
      font-family: $font-body;
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-primary;
      margin: 0;
    }
  `]
})
export class LoadingSpinnerComponent {
  protected loadingService = inject(LoadingService);
}
