/**
 * Contact Service - ReSirve Frontend
 * 
 * Servicio para interactuar con los endpoints de contacto de la API Laravel.
 * Maneja el formulario "Me interesa" y las solicitudes de contacto.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  ContactRequest,
  ContactRequestCreateDTO,
  ContactRequestResponse,
  ContactRequestStats
} from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends ApiService {
  
  // ============================================
  // MÉTODOS PÚBLICOS
  // ============================================
  
  /**
   * Enviar solicitud de contacto "Me interesa"
   * 
   * POST /api/contact
   * 
   * @param data - Datos del formulario de contacto
   * @returns Observable con la respuesta incluyendo link de WhatsApp
   */
  sendContactRequest(data: ContactRequestCreateDTO): Observable<ContactRequestResponse> {
    return this.post<ContactRequestResponse>('contact', data);
  }
  
  // ============================================
  // MÉTODOS ADMINISTRATIVOS (FASE 3)
  // ============================================
  
  /**
   * Listar todas las solicitudes de contacto (Admin)
   * 
   * GET /api/admin/contact
   * 
   * @returns Observable con todas las solicitudes paginadas
   */
  getContactRequests(): Observable<any> {
    return this.get<any>('admin/contact');
  }
  
  /**
   * Obtener estadísticas de solicitudes (Admin)
   * 
   * GET /api/admin/contact/stats
   * 
   * @returns Observable con contadores por status
   */
  getContactRequestStats(): Observable<ContactRequestStats> {
    return this.get<ContactRequestStats>('admin/contact/stats');
  }
  
  /**
   * Cambiar el status de una solicitud (Admin)
   * 
   * PATCH /api/admin/contact/{id}/status/{status}
   * 
   * @param id - ID de la solicitud
   * @param status - Nuevo status (pendiente|contactado|cerrado)
   * @returns Observable con la solicitud actualizada
   */
  updateContactRequestStatus(
    id: number,
    status: 'pendiente' | 'contactado' | 'cerrado'
  ): Observable<ContactRequest> {
    return this.patch<ContactRequest>(`admin/contact/${id}/status/${status}`);
  }
  
  // ============================================
  // UTILIDADES
  // ============================================
  
  /**
   * Generar link de WhatsApp manualmente
   * 
   * Útil si quieres generar el link antes de enviar el formulario,
   * por ejemplo para mostrarlo como preview.
   * 
   * @param phoneNumber - Número de WhatsApp del vendedor
   * @param productTitle - Título del producto
   * @param userName - Nombre del interesado
   * @returns URL de WhatsApp con mensaje prellenado
   */
  generateWhatsAppLink(
    phoneNumber: string,
    productTitle: string,
    userName?: string
  ): string {
    let message = `Hola! Me interesa el producto: *${productTitle}*`;
    
    if (userName) {
      message += `\n\nMi nombre es ${userName}.`;
    }
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}