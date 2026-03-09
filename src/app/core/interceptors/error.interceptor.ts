/**
 * Error Interceptor - ReSirve Frontend
 * 
 * Interceptor HTTP que maneja errores de forma global.
 * Captura errores HTTP y los procesa según su código de estado.
 */

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

/**
 * Interceptor funcional de errores
 * 
 * Captura todos los errores HTTP y los procesa según su tipo:
 * - 400: Bad Request
 * - 401: No autenticado
 * - 403: Sin permisos
 * - 404: No encontrado
 * - 422: Error de validación
 * - 500: Error del servidor
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // Errores del cliente (red, CORS, etc.)
      if (error.error instanceof ErrorEvent) {
        errorService.handleClientError(error.error.message);
      } 
      // Errores del servidor HTTP
      else {
        errorService.handleServerError(error);
      }
      
      // Re-lanzar el error para que los componentes puedan manejarlo si lo necesitan
      return throwError(() => error);
    })
  );
};