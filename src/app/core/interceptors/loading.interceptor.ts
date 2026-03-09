/**
 * Loading Interceptor - ReSirve Frontend
 * 
 * Interceptor HTTP que muestra/oculta un spinner de carga global
 * durante las peticiones HTTP.
 * 
 * En Angular 19, los interceptors son funciones puras en lugar de clases.
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

/**
 * Interceptor funcional de loading
 * 
 * Se activa para todas las peticiones HTTP y muestra un spinner global.
 * El LoadingService mantiene un contador de peticiones activas.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Incrementar contador de peticiones activas
  loadingService.show();
  
  // Procesar la petición y decrementar al finalizar
  return next(req).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};