/**
 * Filter Panel Component - ReSirve Frontend
 * 
 * Panel de filtros para el catálogo de productos.
 * Emite eventos cuando cambian los filtros.
 */

import { Component, OnInit, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '@core/services';
import { ProductFilters, Category } from '@core/models';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent implements OnInit {
  private categoryService = inject(CategoryService);
  
  // Output event cuando cambian los filtros
  filtersChange = output<ProductFilters>();
  
  // State
  private categoriesSignal = signal<Category[]>([]);
  readonly categories = this.categoriesSignal.asReadonly();
  
  // Filtros actuales
  filters: ProductFilters = {
    category: undefined,
    condition: undefined,
    price_min: undefined,
    price_max: undefined,
    search: undefined,
    sort: 'created_at',
    order: 'desc'
  };
  
  ngOnInit(): void {
    this.loadCategories();
  }
  
  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categoriesSignal.set(categories);
      },
      error: (err) => console.error('Error cargando categorías:', err)
    });
  }
  
  /**
   * Aplicar filtros y emitir evento
   */
  applyFilters(): void {
    // Limpiar filtros vacíos
    const cleanFilters: ProductFilters = {};
    
    Object.keys(this.filters).forEach(key => {
      const value = this.filters[key as keyof ProductFilters];
      if (value !== undefined && value !== null && value !== '') {
        cleanFilters[key as keyof ProductFilters] = value as any;
      }
    });
    
    this.filtersChange.emit(cleanFilters);
  }
  
  /**
   * Resetear todos los filtros
   */
  resetFilters(): void {
    this.filters = {
      sort: 'created_at',
      order: 'desc'
    };
    this.applyFilters();
  }
}
