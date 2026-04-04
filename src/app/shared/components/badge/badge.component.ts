/**
 * Badge Component - ReSirve Frontend
 * 
 * Badge reutilizable para mostrar el status de productos.
 * Variantes: disponible (verde), reservado (mostaza), vendido (gris).
 */

import { Component, computed, input } from '@angular/core';
import { ProductStatus } from '@core/models';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span class="badge" [class]="'badge--' + status()">
      <i class="bi" [class]="icon()"></i>
      <span>{{ text() }}</span>
    </span>
  `,
  styles: [`
    @import 'variables';
    @import 'mixins';
    
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: $border-radius-xl;
      font-size: $font-size-sm;
      font-weight: $font-weight-semibold;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      i {
        font-size: 0.9rem;
      }
    }
    
    .badge--disponible {
      background: $color-disponible;
      color: $text-light;
    }
    
    .badge--reservado {
      background: $color-reservado;
      color: $text-primary;
    }
    
    .badge--vendido {
      background: $color-vendido;
      color: $text-light;
    }
  `]
})
export class BadgeComponent {
  /**
   * Status del producto
   */
  status = input.required<ProductStatus>();
  
  protected readonly icon = computed(() => {
    const icons: Record<ProductStatus, string> = {
      disponible: 'bi-check-circle-fill',
      reservado: 'bi-clock-fill',
      vendido: 'bi-x-circle-fill',
    };
    return icons[this.status()] ?? 'bi-circle-fill';
  });

  protected readonly text = computed(() => {
    const texts: Record<ProductStatus, string> = {
      disponible: 'Disponible',
      reservado: 'Reservado',
      vendido: 'Vendido',
    };
    return texts[this.status()] ?? '';
  });
}
