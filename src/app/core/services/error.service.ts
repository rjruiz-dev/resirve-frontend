/**
 * Error Service - ReSirve Frontend
 * 
 * Servicio para gestionar y mostrar errores de la aplicación.
 * Procesa errores HTTP y muestra mensajes apropiados al usuario.
 */

import { Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorResponse, ValidationErrorResponse } from '@core/models';

export interface ErrorMessage {
  type: 'error' | 'warning' | 'info';
  message: string;
  details?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  
  /**
   * Signal con el último error ocurrido
   * Los componentes pueden suscribirse para mostrar alertas
   */
  private currentErrorSignal = signal<ErrorMessage | null>(null);
  
  /**
   * Exponer el error actual como readonly
   */
  readonly currentError = this.currentErrorSignal.asReadonly();
  
  /**
   * Manejar errores del cliente (red, CORS, etc.)
   */
  handleClientError(message: string): void {
    console.error('Client Error:', message);
    
    this.currentErrorSignal.set({
      type: 'error',
      message: 'Error de conexión',
      details: [
        'No se pudo conectar con el servidor.',
        'Verifica tu conexión a internet.',
        message
      ]
    });
  }
  
  /**
   * Manejar errores del servidor HTTP
   */
  handleServerError(error: HttpErrorResponse): void {
    console.error('Server Error:', error);
    
    switch (error.status) {
      case 400:
        this.handle400Error(error);
        break;
      case 401:
        this.handle401Error();
        break;
      case 403:
        this.handle403Error();
        break;
      case 404:
        this.handle404Error(error);
        break;
      case 422:
        this.handle422Error(error);
        break;
      case 500:
      case 502:
      case 503:
        this.handle500Error(error);
        break;
      default:
        this.handleUnknownError(error);
    }
  }
  
  /**
   * 400 - Bad Request
   */
  private handle400Error(error: HttpErrorResponse): void {
    const apiError = error.error as ApiErrorResponse;
    
    this.currentErrorSignal.set({
      type: 'error',
      message: 'Petición incorrecta',
      details: [apiError.message || 'La petición no pudo ser procesada.']
    });
  }
  
  /**
   * 401 - No autenticado
   */
  private handle401Error(): void {
    this.currentErrorSignal.set({
      type: 'warning',
      message: 'Sesión expirada',
      details: ['Tu sesión ha expirado. Por favor, inicia sesión nuevamente.']
    });
    
    // Opcional: Redirigir al login en Fase 3
    // this.router.navigate(['/login']);
  }
  
  /**
   * 403 - Sin permisos
   */
  private handle403Error(): void {
    this.currentErrorSignal.set({
      type: 'warning',
      message: 'Acceso denegado',
      details: ['No tienes permisos para realizar esta acción.']
    });
  }
  
  /**
   * 404 - No encontrado
   */
  private handle404Error(error: HttpErrorResponse): void {
    this.currentErrorSignal.set({
      type: 'info',
      message: 'No encontrado',
      details: ['El recurso solicitado no existe o fue eliminado.']
    });
  }
  
  /**
   * 422 - Error de validación
   * 
   * Laravel devuelve errores de validación con estructura específica
   */
  private handle422Error(error: HttpErrorResponse): void {
    const validationError = error.error as ValidationErrorResponse;
    
    // Extraer todos los mensajes de error de todos los campos
    const details: string[] = [];
    
    if (validationError.errors) {
      Object.keys(validationError.errors).forEach(field => {
        const fieldErrors = validationError.errors[field];
        details.push(...fieldErrors);
      });
    }
    
    this.currentErrorSignal.set({
      type: 'warning',
      message: validationError.message || 'Los datos enviados no son válidos',
      details
    });
  }
  
  /**
   * 500/502/503 - Error del servidor
   */
  private handle500Error(error: HttpErrorResponse): void {
    this.currentErrorSignal.set({
      type: 'error',
      message: 'Error del servidor',
      details: [
        'Ocurrió un error en el servidor.',
        'Por favor, intenta nuevamente más tarde.',
        `Código: ${error.status}`
      ]
    });
  }
  
  /**
   * Error desconocido
   */
  private handleUnknownError(error: HttpErrorResponse): void {
    this.currentErrorSignal.set({
      type: 'error',
      message: 'Error inesperado',
      details: [
        'Ocurrió un error inesperado.',
        `Código: ${error.status}`,
        error.message
      ]
    });
  }
  
  /**
   * Limpiar el error actual
   * 
   * Útil para cerrar alertas manualmente
   */
  clearError(): void {
    this.currentErrorSignal.set(null);
  }
  
  /**
   * Mostrar un error personalizado
   * 
   * Útil para errores de lógica de negocio que no son HTTP
   */
  showError(message: string, details?: string[]): void {
    this.currentErrorSignal.set({
      type: 'error',
      message,
      details
    });
  }
  
  /**
   * Mostrar una advertencia
   */
  showWarning(message: string, details?: string[]): void {
    this.currentErrorSignal.set({
      type: 'warning',
      message,
      details
    });
  }
  
  /**
   * Mostrar información
   */
  showInfo(message: string, details?: string[]): void {
    this.currentErrorSignal.set({
      type: 'info',
      message,
      details
    });
  }
}