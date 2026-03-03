/**
 * API Service - ReSirve Frontend
 * 
 * Servicio base que proporciona la configuración HTTP común
 * para todos los servicios de la aplicación.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Construir la URL completa de un endpoint
   */
  protected getUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  /**
   * GET request genérico
   */
  protected get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.get<T>(this.getUrl(endpoint), { params: httpParams });
  }

  /**
   * POST request genérico
   */
  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(this.getUrl(endpoint), body);
  }

  /**
   * PUT request genérico
   */
  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(this.getUrl(endpoint), body);
  }

  /**
   * PATCH request genérico
   */
  protected patch<T>(endpoint: string, body?: any): Observable<T> {
    return this.http.patch<T>(this.getUrl(endpoint), body);
  }

  /**
   * DELETE request genérico
   */
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.getUrl(endpoint));
  }

  /**
   * Construir HttpParams desde un objeto
   * Filtra valores undefined y null
   */
  private buildHttpParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    Object.keys(params).forEach(key => {
      const value = params[key];
      
      // Ignorar valores undefined o null
      if (value !== undefined && value !== null) {
        // Convertir booleanos a 0/1
        if (typeof value === 'boolean') {
          httpParams = httpParams.set(key, value ? '1' : '0');
        } else {
          httpParams = httpParams.set(key, value.toString());
        }
      }
    });

    return httpParams;
  }
}