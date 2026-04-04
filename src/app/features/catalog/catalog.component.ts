/**
 * Catalog Component - ReSirve Frontend
 * 
 * Catálogo completo de productos con filtros, búsqueda y paginación.
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, CategoryService } from '@core/services';
import { Product, ProductFilters, ProductPaginatedResponse, Category } from '@core/models';
import { ProductCardComponent } from '@shared/components';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  private productsSignal = signal<Product[]>([]);
  private categoriesSignal = signal<Category[]>([]);
  private loadingSignal = signal(true);
  private currentPageSignal = signal(1);
  private totalPagesSignal = signal(1);
  private totalProductsSignal = signal(0);

  readonly products = this.productsSignal.asReadonly();
  readonly categories = this.categoriesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly currentPage = this.currentPageSignal.asReadonly();
  readonly totalPages = this.totalPagesSignal.asReadonly();
  readonly totalProducts = this.totalProductsSignal.asReadonly();

  filters = signal<ProductFilters>({
    search: '',
    category: '',
    status: undefined,
    condition: undefined,
    price_min: undefined,
    price_max: undefined,
    sort: 'created_at',
    order: 'desc',
    page: 1
  });
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categoriesSignal.set(categories)
    });
    
    this.route.queryParams.subscribe(params => {
      const newFilters: ProductFilters = {
        category: params['category'] || '',
        status: params['status'] || undefined,
        condition: params['condition'] || undefined,
        price_min: params['price_min'] ? Number(params['price_min']) : undefined,
        price_max: params['price_max'] ? Number(params['price_max']) : undefined,
        search: params['search'] || '',
        sort: params['sort'] || 'created_at',
        order: params['order'] || 'desc',
        page: params['page'] ? Number(params['page']) : 1
      };
      
      this.filters.set(newFilters);
      this.loadProducts();
    });
  }
  
  private loadProducts(): void {
    this.loadingSignal.set(true);

    this.productService.getProducts(this.filters()).subscribe({
      next: (response: ProductPaginatedResponse) => {
        this.productsSignal.set(response.data);
        this.currentPageSignal.set(response.meta.current_page);
        this.totalPagesSignal.set(response.meta.last_page);
        this.totalProductsSignal.set(response.meta.total);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loadingSignal.set(false);
      }
    });
  }
  
  applyFilters(): void {
    const filters = this.filters();
    const queryParams: any = {};
    
    if (filters.category) queryParams.category = filters.category;
    if (filters.status) queryParams.status = filters.status;
    if (filters.condition) queryParams.condition = filters.condition;
    if (filters.price_min) queryParams.price_min = filters.price_min;
    if (filters.price_max) queryParams.price_max = filters.price_max;
    if (filters.search) queryParams.search = filters.search;
    if (filters.sort) queryParams.sort = filters.sort;
    if (filters.order) queryParams.order = filters.order;
    
    this.router.navigate(['/catalogo'], { queryParams });
  }
  
  clearFilters(): void {
    this.filters.set({
      category: '',
      status: undefined,
      condition: undefined,
      price_min: undefined,
      price_max: undefined,
      search: '',
      sort: 'created_at',
      order: 'desc',
      page: 1
    });
    this.router.navigate(['/catalogo']);
  }
  
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    const currentFilters = this.filters();
    this.filters.set({ ...currentFilters, page });
    this.applyFilters();
  }
  
  updateFilter(key: keyof ProductFilters, value: any): void {
    const currentFilters = this.filters();
    this.filters.set({ ...currentFilters, [key]: value, page: 1 });
  }

  updatePriceFilter(key: 'price_min' | 'price_max', value: string): void {
    this.updateFilter(key, value ? Number(value) : undefined);
  }
}
