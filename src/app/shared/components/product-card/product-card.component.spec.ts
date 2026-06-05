/**
 * product-card.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para ProductCardComponent.
 * Verifica renderizado de datos del producto, soporte dark mode y estructura.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductCardComponent } from './product-card.component';
import { Product, ProductStatus, ProductCondition } from '@core/models';

/** Producto mock mínimo para testing. */
function createMockProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    title: 'Bicicleta Vintage',
    slug: 'bicicleta-vintage',
    description: 'Una hermosa bicicleta restaurada.',
    story: null,
    price: 45000,
    formatted_price: '$45.000',
    condition: 'buen_estado' as ProductCondition,
    condition_text: 'Buen estado',
    status: 'disponible' as ProductStatus,
    status_text: 'Disponible',
    is_featured: false,
    views_count: 120,
    url: '/productos/bicicleta-vintage',
    created_at: '2026-01-01',
    created_at_human: 'hace 5 meses',
    updated_at: '2026-01-15',
    ...overrides,
  };
}

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', createMockProduct());
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the product title', () => {
      const element: HTMLElement = fixture.nativeElement;
      expect(element.textContent).toContain('Bicicleta Vintage');
    });
  });

  describe('product data rendering', () => {
    it('should render the formatted price', () => {
      const element: HTMLElement = fixture.nativeElement;
      expect(element.textContent).toContain('$45.000');
    });

    it('should render the product description', () => {
      const element: HTMLElement = fixture.nativeElement;
      expect(element.textContent).toContain('Una hermosa bicicleta restaurada.');
    });

    it('should render the condition text', () => {
      const element: HTMLElement = fixture.nativeElement;
      expect(element.textContent).toContain('Buen estado');
    });

    it('should render a link with the product slug', () => {
      const link: HTMLAnchorElement | null =
        fixture.nativeElement.querySelector('.product-card__link');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('href')).toBe('/productos/bicicleta-vintage');
    });
  });

  describe('featured flag', () => {
    it('should show featured star when product is featured', () => {
      fixture.componentRef.setInput(
        'product',
        createMockProduct({ is_featured: true })
      );
      fixture.detectChanges();

      const featuredEl: HTMLElement | null =
        fixture.nativeElement.querySelector('.product-card__featured');
      expect(featuredEl).toBeTruthy();
    });

    it('should NOT show featured star when product is not featured', () => {
      const featuredEl: HTMLElement | null =
        fixture.nativeElement.querySelector('.product-card__featured');
      expect(featuredEl).toBeNull();
    });
  });

  describe('category', () => {
    it('should render category name when category is present', () => {
      fixture.componentRef.setInput(
        'product',
        createMockProduct({
          category: {
            id: 1,
            name: 'Deportes',
            slug: 'deportes',
            description: null,
            icon: 'bi-bicycle',
            url: '/categoria/deportes',
            products_count: 10,
            created_at: '2026-01-01',
          },
        })
      );
      fixture.detectChanges();

      const element: HTMLElement = fixture.nativeElement;
      expect(element.textContent).toContain('Deportes');
    });

    it('should NOT render category section when category is undefined', () => {
      const categoryEl: HTMLElement | null =
        fixture.nativeElement.querySelector('.product-card__category');
      expect(categoryEl).toBeNull();
    });
  });

  describe('card structure', () => {
    it('should have an image element', () => {
      const img: HTMLImageElement | null =
        fixture.nativeElement.querySelector('.product-card__image img');
      expect(img).toBeTruthy();
    });

    it('should render a badge component for product status', () => {
      const badge: HTMLElement | null =
        fixture.nativeElement.querySelector('.product-card__badge app-badge');
      expect(badge).toBeTruthy();
    });
  });
});
