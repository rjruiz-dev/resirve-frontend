/**
 * Footer Component - ReSirve Frontend
 *
 * Pie de página con 4 columnas: brand + social, navegación,
 * categorías, y contacto. Diseño responsive según design-system §7.5.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  /** Año actual para el copyright. */
  currentYear = new Date().getFullYear();

  /** Número de WhatsApp para contacto (formateado para display). */
  readonly displayPhone = '+54 9 11 31234-5678';

  /** Número de WhatsApp (sin formato, para el link). */
  private readonly whatsappNumber = '+5491112345678';

  /** Link de WhatsApp sin el prefijo +. */
  readonly whatsappLink = `https://wa.me/${this.whatsappNumber.replace(/\+/g, '')}`;

  /** Email de contacto. */
  readonly contactEmail = 'hola@resirve.com';

  /** Links de navegación del footer. */
  readonly navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Acerca de', path: '/acerca-de' },
    { label: 'Contacto', path: '/contacto' },
  ];

  /** Links de categorías del footer. */
  readonly categoryLinks = [
    { label: 'Electrodomésticos', path: '/categoria/electrodomesticos' },
    { label: 'Muebles', path: '/categoria/muebles' },
    { label: 'Deportes', path: '/categoria/deportes' },
    { label: 'Tecnología', path: '/categoria/tecnologia' },
    { label: 'Ropa', path: '/categoria/ropa' },
    { label: 'Hogar', path: '/categoria/hogar' },
  ];
}
