/**
 * Product Model - ReSirve Frontend
 * 
 * Interfaces TypeScript que representan los productos
 * tal como los devuelve la API de Laravel.
 */

import { Category } from './category.model';
import { ProductImage } from './product-image.model';

/**
 * Interface principal de Product
 * 
 * Representa un producto completo con todas sus relaciones.
 * Esta estructura coincide exactamente con el ProductResource de Laravel.
 */
export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  story: string | null;
  price: number;
  formatted_price: string;
  condition: ProductCondition;
  condition_text: string;
  status: ProductStatus;
  status_text: string;
  is_featured: boolean;
  views_count: number;
  url: string;
  
  // Relaciones
  category?: Category;
  images?: ProductImage[];
  primary_image?: ProductImage;
  
  // Fechas
  created_at: string;
  created_at_human: string;
  updated_at: string;
}

/**
 * Estados posibles de conservación del producto
 */
export type ProductCondition = 'como_nuevo' | 'buen_estado' | 'funcional';

/**
 * Estados posibles de disponibilidad del producto
 */
export type ProductStatus = 'disponible' | 'reservado' | 'vendido';

/**
 * Opciones de filtro para el catálogo
 */
export interface ProductFilters {
  category?: string;
  status?: ProductStatus;
  condition?: ProductCondition;
  price_min?: number;
  price_max?: number;
  search?: string;
  featured?: boolean;
  sort?: 'created_at' | 'price' | 'views_count' | 'title';
  order?: 'asc' | 'desc';
  page?: number;
}

/**
 * Respuesta paginada de productos
 */
export interface ProductPaginatedResponse {
  data: Product[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

/**
 * Estadísticas del catálogo
 */
export interface ProductStats {
  total_products: number;
  available_products: number;
  reserved_products: number;
  sold_products: number;
  categories_count: number;
}