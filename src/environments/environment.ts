/**
 * Configuración de Entorno - Desarrollo
 * 
 * Este archivo contiene todas las variables de configuración
 * para el entorno de desarrollo local.
 */

export const environment = {
  production: false,
  
  // URL base de la API Laravel
  apiUrl: 'http://localhost:8000/api',
  
  // Configuración de la aplicación
  appName: 'ReSirve',
  appVersion: '1.0.0',
  
  // Paginación
  itemsPerPage: 12,
  
  // Timeouts (en milisegundos)
  httpTimeout: 30000,
  
  // Configuración de animaciones
  enableAnimations: true,
  
  // Logging
  enableConsoleLog: true,
  enableErrorTracking: false,
  
  // Configuración de Claude API (Fase 2)
  claudeApiKey: '', // Se configurará en Fase 2
  claudeModel: 'claude-haiku-4-5',
  
  // WhatsApp
  whatsappNumber: '5491112345678', // Debe coincidir con el backend
  
  // Google Analytics (opcional)
  googleAnalyticsId: '',
  
  // Features flags (para activar/desactivar funcionalidades)
  features: {
    chat: false,           // Chat con IA (Fase 2)
    comparison: false,     // Comparador de productos (Fase 2)
    admin: false,          // Panel de administración (Fase 3)
    search: true,          // Búsqueda básica
    filters: true,         // Filtros de catálogo
    contactForm: true      // Formulario de contacto
  }
};