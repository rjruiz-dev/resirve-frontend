/**
 * Contact Request Model - ReSirve Frontend
 * 
 * Interfaces TypeScript para las solicitudes de contacto.
 */

/**
 * Interface principal de ContactRequest
 * 
 * Representa una solicitud de contacto tal como la devuelve
 * el ContactRequestResource de Laravel.
 */
export interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: ContactRequestStatus;
  status_text: string;
  contact_info: string;
  
  // Producto relacionado (info básica)
  product?: {
    id: number;
    title: string;
    slug: string;
    price: number;
    formatted_price: string;
    url: string;
  };
  
  // Fechas
  created_at: string;
  created_at_human: string;
  updated_at: string;
}

/**
 * Estados posibles de una solicitud de contacto
 */
export type ContactRequestStatus = 'pendiente' | 'contactado' | 'cerrado';

/**
 * DTO para crear una nueva solicitud de contacto
 * 
 * Usado en el formulario "Me interesa"
 */
export interface ContactRequestCreateDTO {
  product_id: number;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

/**
 * Respuesta al crear una solicitud de contacto
 * 
 * Laravel devuelve mensaje + datos + link de WhatsApp
 */
export interface ContactRequestResponse {
  message: string;
  data: ContactRequest;
  whatsapp_link: string;
}

/**
 * Estadísticas de solicitudes de contacto (Admin - Fase 3)
 */
export interface ContactRequestStats {
  total: number;
  pending: number;
  contacted: number;
  closed: number;
}