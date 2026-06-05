/**
 * Navbar Component - ReSirve Frontend
 *
 * Barra de navegación principal con fondo oscuro fijo,
 * barra de búsqueda centrada, toggle de tema y menú responsive.
 */

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '@core/services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  /** Servicio de tema para light/dark mode. */
  readonly themeService = inject(ThemeService);

  /**
   * Signal para controlar el estado del menú móvil
   */
  menuOpen = signal(false);

  /**
   * Toggle del menú móvil
   */
  toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }

  /**
   * Cerrar menú móvil al hacer click en un link
   */
  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
