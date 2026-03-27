/**
 * Footer Component - ReSirve Frontend
 * 
 * Pie de página con enlaces, información de contacto y redes sociales.
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
  currentYear = new Date().getFullYear();
  
  whatsappNumber = '+5491112345678'; // Debería venir del environment
  whatsappLink = `https://wa.me/${this.whatsappNumber.replace(/\+/g, '')}`;
}
