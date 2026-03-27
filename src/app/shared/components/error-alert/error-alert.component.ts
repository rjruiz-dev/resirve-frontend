/**
 * Error Alert Component - ReSirve Frontend
 * 
 * Muestra alertas de error/warning/info globales.
 * Conectado al ErrorService para mostrar errores HTTP automáticamente.
 */

import { Component, inject } from '@angular/core';
import { ErrorService } from '@core/services';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss'
})
export class ErrorAlertComponent {
  protected errorService = inject(ErrorService);
  
  /**
   * Cerrar la alerta
   */
  closeAlert(): void {
    this.errorService.clearError();
  }
  
  /**
   * Obtener el ícono según el tipo de error
   */
  getIcon(type: string): string {
    switch (type) {
      case 'error':
        return 'bi-exclamation-circle-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return 'bi-info-circle-fill';
    }
  }
}
