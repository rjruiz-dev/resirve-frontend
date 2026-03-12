/**
 * App Component - ReSirve Frontend
 * 
 * Componente raíz de la aplicación.
 * Contiene el layout principal y el router-outlet.
 */

import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainLayoutComponent
  ],
  template: `
    <app-main-layout />
  `
})
export class AppComponent {
  title = 'ReSirve';
}
