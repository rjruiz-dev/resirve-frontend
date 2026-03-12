/**
 * Navbar Component - ReSirve Frontend
 * 
 * Barra de navegación principal con diseño distintivo.
 * Responsive con menú hamburguesa en móvil.
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
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