/**
 * Configuración de Entorno - Producción
 * 
 * Este archivo contiene todas las variables de configuración
 * para el entorno de producción.
 * 
 * IMPORTANTE: Actualiza estos valores antes de hacer deploy.
 */

export const environment = {
  production: true,
  
  // URL base de la API Laravel (ACTUALIZAR CON TU DOMINIO)
  apiUrl: 'https://api.resirve.com/api',
  
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
  enableConsoleLog: false,
  enableErrorTracking: true,
  
  // Configuración de Claude API (Fase 2)
  claudeApiKey: '', // NO poner aquí, usar variables de entorno del servidor
  claudeModel: 'claude-haiku-4-5',
  
  // WhatsApp
  whatsappNumber: '5491112345678',
  
  // Google Analytics (opcional)
  googleAnalyticsId: 'G-XXXXXXXXXX', // Configurar tu ID
  
  // Features flags
  features: {
    chat: false,
    comparison: false,
    admin: false,
    search: true,
    filters: true,
    contactForm: true
  }
};