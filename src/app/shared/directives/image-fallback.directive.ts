/**
 * Image Fallback Directive - ReSirve Frontend
 * 
 * Directiva para mostrar una imagen por defecto si la original falla al cargar.
 * 
 * Uso:
 * <img [src]="product.image" appImageFallback="/assets/images/placeholder.jpg">
 */

import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {
  private el = inject(ElementRef<HTMLImageElement>);
  
  /**
   * Imagen de fallback a mostrar si falla la carga
   * Por defecto, muestra un placeholder genérico
   */
  @Input() appImageFallback: string = '/assets/images/product-placeholder.jpg';
  
  /**
   * Flag para evitar loops infinitos si el fallback también falla
   */
  private hasTriedFallback = false;
  
  /**
   * Listener del evento error de la imagen
   */
  @HostListener('error')
  onError(): void {
    if (!this.hasTriedFallback) {
      this.hasTriedFallback = true;
      this.el.nativeElement.src = this.appImageFallback;
    }
  }
}