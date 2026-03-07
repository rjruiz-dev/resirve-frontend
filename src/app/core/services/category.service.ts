/**
 * Category Service - ReSirve Frontend
 * 
 * Servicio para interactuar con los endpoints de categorías de la API Laravel.
 */

import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Category, CategoryOption } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {
  
  // ============================================
  // STATE MANAGEMENT CON SIGNALS
  // ============================================
  
  /**
   * Signal con las categorías cargadas
   * Se carga una sola vez y se cachea
   */
  private categoriesSignal = signal<Category[]>([]);
  
  /**
   * Exponer las categorías como readonly
   */
  readonly categories = this.categoriesSignal.asReadonly();
  
  // ============================================
  // MÉTODOS PARA CONSUMIR LA API
  // ============================================
  
  /**
   * Listar todas las categorías con contadores
   * 
   * GET /api/categories
   * 
   * @returns Observable con todas las categorías
   */
  getCategories(): Observable<Category[]> {
    // Si ya están en cache, no volver a pedir
    if (this.categoriesSignal().length > 0) {
      return new Observable(observer => {
        observer.next(this.categoriesSignal());
        observer.complete();
      });
    }
    
    return this.get<Category[]>('categories').pipe(
      tap(categories => {
        this.categoriesSignal.set(categories);
      })
    );
  }
  
  /**
   * Obtener una categoría específica por slug
   * 
   * GET /api/categories/{slug}
   * 
   * @param slug - Slug único de la categoría
   * @returns Observable con la categoría y sus productos disponibles
   */
  getCategoryBySlug(slug: string): Observable<Category> {
    return this.get<Category>(`categories/${slug}`);
  }
  
  // ============================================
  // UTILIDADES
  // ============================================
  
  /**
   * Obtener categorías formateadas para un dropdown/select
   * 
   * @returns Array de opciones {value, label, icon}
   */
  getCategoryOptions(): CategoryOption[] {
    return this.categoriesSignal().map(cat => ({
      value: cat.slug,
      label: cat.name,
      icon: cat.icon || undefined
    }));
  }
  
  /**
   * Encontrar una categoría por slug en el cache
   */
  findCategoryBySlug(slug: string): Category | undefined {
    return this.categoriesSignal().find(c => c.slug === slug);
  }
  
  /**
   * Recargar las categorías desde la API (forzar refresh)
   */
  refreshCategories(): Observable<Category[]> {
    this.categoriesSignal.set([]); // Limpiar cache
    return this.getCategories();
  }
}