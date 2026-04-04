/**
 * About Component - ReSirve Frontend
 * 
 * Página "Acerca de" que explica la misión y valores de ReSirve.
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  features = [
    {
      icon: 'bi-shield-check',
      title: 'Compra Segura',
      description: 'Todos los productos son verificados antes de publicarse. Transacciones directas y transparentes.'
    },
    {
      icon: 'bi-recycle',
      title: 'Sustentable',
      description: 'Dale una segunda vida a productos de calidad. Contribuye a reducir el desperdicio.'
    },
    {
      icon: 'bi-hand-thumbs-up',
      title: 'Directo',
      description: 'Sin intermediarios. Conecta directamente con el vendedor para una mejor experiencia.'
    },
    {
      icon: 'bi-heart',
      title: 'Con Historia',
      description: 'Cada producto tiene su propia historia. Compra artículos con significado y valor.'
    }
  ];
  
  stats = [
    { number: '500+', label: 'Productos publicados' },
    { number: '200+', label: 'Clientes satisfechos' },
    { number: '95%', label: 'Tasa de satisfacción' }
  ];
}
