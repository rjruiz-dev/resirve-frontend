/**
 * Product Card Component - ReSirve Frontend
 * 
 * Tarjeta de producto reutilizable para home, catálogo y productos relacionados.
 * Diseño distintivo con hover elegante.
 */

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@core/models';
import { BadgeComponent } from '@shared/components';
import { ImageFallbackDirective } from '@shared/directives';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, BadgeComponent, ImageFallbackDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  /**
   * Producto a mostrar (usando signals input de Angular 19)
   */
  product = input.required<Product>();
}
