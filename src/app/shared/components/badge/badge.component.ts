/**
 * Badge Component - ReSirve Frontend
 *
 * Badge reutilizable para mostrar el status y la condición de productos.
 * Variantes: disponible, reservado, vendido, excellent, good, fair, featured.
 * Diseño pill (radius-full) con tipografía label según design-system §7.6.
 */

import { Component, computed, input } from '@angular/core';

/** Todas las variantes soportadas por el badge. */
export type BadgeVariant =
  | 'disponible'
  | 'reservado'
  | 'vendido'
  | 'excellent'
  | 'good'
  | 'fair'
  | 'featured';

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
      gap: $spacing-xs;
      padding: $spacing-xs $spacing-sm;
      border-radius: $border-radius-full;
      font-size: $font-size-sm;
      font-weight: $font-weight-semibold;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      i {
        font-size: 0.9rem;
      }
    }

    // === Status de producto ===

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

    // === Condición del producto (design-system §7.6) ===

    .badge--excellent {
      background: $color-condition-excellent;
      color: $text-light;
    }

    .badge--good {
      background: $color-condition-good;
      color: $text-light;
    }

    .badge--fair {
      background: $color-condition-fair;
      color: $text-light;
    }

    // === Featured / Destacado ===

    .badge--featured {
      background: $color-teal;
      color: $text-light;
    }
  `]
})
export class BadgeComponent {
  /**
   * Variante del badge: status de producto o condición.
   */
  status = input.required<BadgeVariant>();

  protected readonly icon = computed(() => {
    const icons: Record<BadgeVariant, string> = {
      disponible: 'bi-check-circle-fill',
      reservado: 'bi-clock-fill',
      vendido: 'bi-x-circle-fill',
      excellent: 'bi-star-fill',
      good: 'bi-hand-thumbs-up-fill',
      fair: 'bi-exclamation-circle-fill',
      featured: 'bi-star-fill',
    };
    return icons[this.status()] ?? 'bi-circle-fill';
  });

  protected readonly text = computed(() => {
    const texts: Record<BadgeVariant, string> = {
      disponible: 'Disponible',
      reservado: 'Reservado',
      vendido: 'Vendido',
      excellent: 'Excelente',
      good: 'Bueno',
      fair: 'Regular',
      featured: 'Destacado',
    };
    return texts[this.status()] ?? '';
  });
}
