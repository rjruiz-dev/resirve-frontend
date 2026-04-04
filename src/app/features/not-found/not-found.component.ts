/**
 * Not Found Component - ReSirve Frontend
 * 
 * Página 404 para rutas no encontradas.
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  suggestions = [
    { icon: 'bi-house-door', label: 'Volver al inicio', link: '/' },
    { icon: 'bi-grid-3x3-gap', label: 'Ver catálogo', link: '/catalogo' },
    { icon: 'bi-envelope', label: 'Contactar', link: '/contacto' }
  ];
}
