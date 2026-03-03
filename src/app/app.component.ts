/**
 * App Component - ReSirve Frontend
 * 
 * Componente raíz de la aplicación.
 * Contiene el layout principal y el router-outlet.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
    <div class="app-container">
      <!-- El contenido de cada ruta se renderiza aquí -->
      <router-outlet />
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class AppComponent {
  title = 'ReSirve';
}