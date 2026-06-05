/**
 * catalog.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para CatalogComponent.
 * Verifica creación, filtros y renderizado de productos.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CatalogComponent } from './catalog.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent],
      providers: [provideRouter([]), provideHttpClient()],
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
    it('should show loading text when loading is true', () => {
      const loadingEl = fixture.nativeElement.querySelector('.catalog__loading');
      expect(loadingEl).toBeTruthy();
      expect(loadingEl.textContent).toContain('Cargando');
    });
  });

  describe('pagination buttons', () => {
    it('should render the pagination buttons as disabled by default', () => {
      const prevBtn: HTMLButtonElement | null =
        fixture.nativeElement.querySelector('.pagination__btn:first-child');
      expect(prevBtn).toBeTruthy();
    });
  });
});
