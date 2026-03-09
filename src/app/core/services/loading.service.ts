/**
 * Loading Service - ReSirve Frontend
 * 
 * Servicio para gestionar el estado de carga global de la aplicación.
 * Mantiene un contador de peticiones HTTP activas.
 */

import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  /**
   * Contador de peticiones HTTP activas
   * Usa signal para reactividad automática
   */
  private loadingCountSignal = signal<number>(0);
  
  /**
   * Computed signal - true si hay al menos una petición activa
   */
  readonly isLoading = computed(() => this.loadingCountSignal() > 0);
  
  /**
   * Incrementar el contador (se inicia una petición)
   */
  show(): void {
    this.loadingCountSignal.update(count => count + 1);
  }
  
  /**
   * Decrementar el contador (finaliza una petición)
   */
  hide(): void {
    this.loadingCountSignal.update(count => Math.max(0, count - 1));
  }
  
  /**
   * Forzar ocultar (reset del contador)
   * Útil en casos excepcionales
   */
  forceHide(): void {
    this.loadingCountSignal.set(0);
  }
}