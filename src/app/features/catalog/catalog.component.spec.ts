/**
 * catalog.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para CatalogComponent.
 * Verifica creación, filtros y renderizado de productos.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CatalogComponent } from './catalog.component';
import { ProductService, CategoryService } from '@core/services';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  const mockProductService = {
    getProducts: jasmine.createSpy('getProducts').and.returnValue(of({
      data: [],
      meta: { current_page: 1, last_page: 1, total: 0 }
    }))
  };

  const mockCategoryService = {
    getCategories: jasmine.createSpy('getCategories').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: mockProductService },
        { provide: CategoryService, useValue: mockCategoryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('header', () => {
    it('should render the catalog title', () => {
      const titleEl = fixture.nativeElement.querySelector('.catalog__title');
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toContain('Catálogo');
    });

    it('should display available products count', () => {
      const subtitleEl = fixture.nativeElement.querySelector('.catalog__subtitle');
      expect(subtitleEl).toBeTruthy();
      expect(subtitleEl.textContent).toContain('productos');
    });
  });

  describe('filters panel', () => {
    it('should render the filters panel header', () => {
      const filterHeader = fixture.nativeElement.querySelector('.filters-panel__header h3');
      expect(filterHeader).toBeTruthy();
      expect(filterHeader.textContent).toContain('Filtros');
    });

    it('should render a search input', () => {
      const searchInput = fixture.nativeElement.querySelector(
        '.filter-group input[type="text"]'
      );
      expect(searchInput).toBeTruthy();
      expect(searchInput.getAttribute('placeholder')).toContain('Buscar');
    });

    it('should render a clear filters button', () => {
      const clearBtn = fixture.nativeElement.querySelector('.btn-clear');
      expect(clearBtn).toBeTruthy();
      expect(clearBtn.textContent).toContain('Limpiar');
    });

    it('should render category select dropdown', () => {
      const catSelect = fixture.nativeElement.querySelector('.filter-group select');
      expect(catSelect).toBeTruthy();
    });
  });

  describe('loading state', () => {
    it('should track loading as a signal', () => {
      expect(component.loading).toBeDefined();
    });
  });

  describe('pagination', () => {
    it('should not render pagination when only one page exists', () => {
      const pagination = fixture.nativeElement.querySelector('.pagination');
      expect(pagination).toBeFalsy();
    });

    it('should track current page and total pages as signals', () => {
      expect(component.currentPage()).toBe(1);
      expect(component.totalPages()).toBe(1);
    });
  });
});
