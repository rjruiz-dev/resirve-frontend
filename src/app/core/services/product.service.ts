/**
 * Product Service - ReSirve Frontend
 * 
 * Servicio para interactuar con los endpoints de productos de la API Laravel.
 * Todos los métodos devuelven Observables que pueden ser suscritos en los componentes.
 */

import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import {
  Product,
  ProductFilters,
  ProductPaginatedResponse,
  ProductStats
} from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {
  
  // ============================================
  // STATE MANAGEMENT CON SIGNALS
  // ============================================
  
  /**
   * Signal con los productos cargados actualmente
   * Útil para compartir datos entre componentes sin re-fetch
   */
  private productsSignal = signal<Product[]>([]);
  
  /**
   * Signal computed - productos disponibles
   */
  readonly availableProducts = computed(() =>
    this.productsSignal().filter(p => p.status === 'disponible')
  );
  
  /**
   * Signal computed - productos destacados
   */
  readonly featuredProducts = computed(() =>
    this.productsSignal().filter(p => p.is_featured)
  );
  
  /**
   * Exponer los productos como readonly
   */
  readonly products = this.productsSignal.asReadonly();
  
  // ============================================
  // MÉTODOS PARA CONSUMIR LA API
  // ============================================
  
  /**
   * Listar productos con filtros opcionales
   * 
   * GET /api/products
   * 
   * @param filters - Filtros de búsqueda, precio, categoría, etc.
   * @returns Observable con respuesta paginada de productos
   */
  getProducts(filters?: ProductFilters): Observable<ProductPaginatedResponse> {
    return this.get<ProductPaginatedResponse>('products', filters).pipe(
      tap(response => {
        // Actualizar el signal con los nuevos productos
        this.productsSignal.set(response.data);
      })
    );
  }
  
  /**
   * Obtener un producto específico por su slug
   * 
   * GET /api/products/{slug}
   * 
   * @param slug - Slug único del producto
   * @returns Observable con el producto completo
   */
  getProductBySlug(slug: string): Observable<Product> {
    return this.get<Product>(`products/${slug}`);
  }
  
  /**
   * Obtener productos destacados para el homepage
   * 
   * GET /api/products/featured
   * 
   * @returns Observable con hasta 4 productos destacados
   */
  getFeaturedProducts(): Observable<Product[]> {
    return this.get<Product[]>('products/featured').pipe(
      tap(products => {
        // Opcional: actualizar signal si es necesario
        // this.productsSignal.set(products);
      })
    );
  }
  
  /**
   * Obtener productos recientes
   * 
   * GET /api/products/recent
   * 
   * @returns Observable con los últimos 6 productos agregados
   */
  getRecentProducts(): Observable<Product[]> {
    return this.get<Product[]>('products/recent');
  }
  
  /**
   * Obtener productos relacionados (misma categoría)
   * 
   * GET /api/products/{slug}/related
   * 
   * @param slug - Slug del producto actual
   * @returns Observable con hasta 4 productos relacionados
   */
  getRelatedProducts(slug: string): Observable<Product[]> {
    return this.get<Product[]>(`products/${slug}/related`);
  }
  
  /**
   * Obtener estadísticas del catálogo
   * 
   * GET /api/products/stats
   * 
   * @returns Observable con contadores de productos
   */
  getProductStats(): Observable<ProductStats> {
    return this.get<ProductStats>('products/stats');
  }
  
  // ============================================
  // UTILIDADES
  // ============================================
  
  /**
   * Limpiar el cache de productos
   * Útil cuando navegas fuera del catálogo
   */
  clearCache(): void {
    this.productsSignal.set([]);
  }
  
  /**
   * Verificar si un producto específico está en cache
   */
  isProductInCache(slug: string): boolean {
    return this.productsSignal().some(p => p.slug === slug);
  }
  
  /**
   * Obtener un producto del cache si existe
   */
  getProductFromCache(slug: string): Product | undefined {
    return this.productsSignal().find(p => p.slug === slug);
  }
}