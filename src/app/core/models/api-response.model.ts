/**
 * API Response Models - ReSirve Frontend
 * 
 * Interfaces genéricas para las respuestas de la API.
 */

/**
 * Respuesta estándar de la API
 * 
 * Muchos endpoints devuelven un objeto con data + message
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * Respuesta de error de la API
 * 
 * Laravel devuelve errores con esta estructura
 */
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Respuesta de validación fallida (422)
 * 
 * Laravel devuelve errores de validación campo por campo
 */
export interface ValidationErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

/**
 * Health check response
 */
export interface HealthCheckResponse {
  status: string;
  message: string;
  timestamp: string;
  version: string;
}