/**
 * Search Component - ReSirve Frontend
 *
 * Página de búsqueda de productos (Fase 2 - pendiente de implementación).
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="stub-page">
      <i class="bi bi-search"></i>
      <h2>Búsqueda</h2>
      <p>Esta funcionalidad estará disponible próximamente.</p>
      <a routerLink="/" class="btn">Volver al inicio</a>
    </div>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';

    .stub-page {
      @include flex-center;
      @include flex-column;
      min-height: 50vh;
      text-align: center;
      gap: $spacing-lg;
      padding: $spacing-2xl;

      i { font-size: 3rem; color: $text-muted; }
      h2 { margin: 0; color: $text-primary; }
      p { color: $text-secondary; }
      .btn {
        padding: $spacing-sm $spacing-xl;
        background: $color-terracota;
        color: $text-light;
        border-radius: $border-radius-md;
        text-decoration: none;
      }
    }
  `]
})
export class SearchComponent {}
