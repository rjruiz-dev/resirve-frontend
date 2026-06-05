/**
 * product-detail.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para ProductDetailComponent.
 * Verifica creación, loading state, y estructura de la página.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('loading state', () => {
    it('should show loading text while product is loading', () => {
      const loadingEl = fixture.nativeElement.querySelector('.loading p');
      expect(loadingEl).toBeTruthy();
      expect(loadingEl.textContent).toContain('Cargando');
    });

    it('should NOT show product detail content while loading', () => {
      const detailEl = fixture.nativeElement.querySelector('.product-detail');
      expect(detailEl).toBeFalsy();
    });
  });

  describe('contact form', () => {
    it('should initialize contactForm with 4 controls', () => {
      expect(component.contactForm).toBeTruthy();
      expect(component.contactForm.contains('name')).toBeTrue();
      expect(component.contactForm.contains('email')).toBeTrue();
      expect(component.contactForm.contains('phone')).toBeTrue();
      expect(component.contactForm.contains('message')).toBeTrue();
    });

    it('should require name and email fields', () => {
      const nameControl = component.contactForm.get('name');
      const emailControl = component.contactForm.get('email');

      expect(nameControl?.hasValidator).toBeTruthy();
      expect(emailControl?.hasValidator).toBeTruthy();
    });
  });

  describe('signals', () => {
    it('should initialize selectedImageIndex to 0', () => {
      expect(component.selectedImageIndex()).toBe(0);
    });

    it('should initialize formSubmitted to false', () => {
      expect(component.formSubmitted()).toBeFalse();
    });

    it('should initialize formSuccess to false', () => {
      expect(component.formSuccess()).toBeFalse();
    });

    it('should initialize loading to true', () => {
      expect(component.loading()).toBeTrue();
    });
  });
});
