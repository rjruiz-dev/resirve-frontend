/**
 * Product Image Model - ReSirve Frontend
 * 
 * Interfaces TypeScript para las imágenes de productos.
 */

/**
 * Interface principal de ProductImage
 * 
 * Representa una imagen de producto tal como la devuelve
 * el ProductImageResource de Laravel.
 */
export interface ProductImage {
  id: number;
  path: string;
  full_url: string;
  is_primary: boolean;
  order: number;
}