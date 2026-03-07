/**
 * Category Model - ReSirve Frontend
 * 
 * Interfaces TypeScript para las categorías de productos.
 */

import { Product } from './product.model';

/**
 * Interface principal de Category
 * 
 * Representa una categoría de productos tal como la devuelve
 * el CategoryResource de Laravel.
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  url: string;
  
  // Contadores (solo si se cargaron con withCount)
  products_count?: number;
  available_products_count?: number;
  
  // Relaciones (solo si se cargaron explícitamente)
  products?: Product[];
  available_products?: Product[];
  
  // Fechas
  created_at: string;
}

/**
 * Helper para dropdown de categorías
 */
export interface CategoryOption {
  value: string;
  label: string;
  icon?: string;
}