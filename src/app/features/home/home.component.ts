/**
 * Home Component - ReSirve Frontend
 * 
 * Página principal con hero section, productos destacados y recientes.
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService, CategoryService } from '@core/services';
import { Product, Category } from '@core/models';
import { ProductCardComponent } from '@shared/components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  
  // Signals para los datos
  private featuredProductsSignal = signal<Product[]>([]);
  private recentProductsSignal = signal<Product[]>([]);
  private categoriesSignal = signal<Category[]>([]);
  private loadingSignal = signal(true);

  readonly featuredProducts = this.featuredProductsSignal.asReadonly();
  readonly recentProducts = this.recentProductsSignal.asReadonly();
  readonly categories = this.categoriesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  
  ngOnInit(): void {
    this.loadHomeData();
  }
  
  /**
   * Cargar todos los datos de la página home
   */
  private loadHomeData(): void {
    this.loadingSignal.set(true);
    
    // Cargar productos destacados
    this.productService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProductsSignal.set(products);
      },
      error: (err) => console.error('Error cargando destacados:', err)
    });
    
    // Cargar productos recientes
    this.productService.getRecentProducts().subscribe({
      next: (products) => {
        this.recentProductsSignal.set(products);
      },
      error: (err) => console.error('Error cargando recientes:', err)
    });
    
    // Cargar categorías
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categoriesSignal.set(categories);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error cargando categorías:', err);
        this.loadingSignal.set(false);
      }
    });
  }
}
