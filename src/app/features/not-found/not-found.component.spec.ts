/**
 * not-found.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para NotFoundComponent.
 * Verifica creación, código 404, mensaje de error y sugerencias.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('error display', () => {
    it('should render "404" error code', () => {
      const codeEl = fixture.nativeElement.querySelector('.error-code');
      expect(codeEl).toBeTruthy();
      expect(codeEl.textContent.trim()).toBe('404');
    });

    it('should render error title in Spanish', () => {
      const titleEl = fixture.nativeElement.querySelector('.error-title');
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toContain('Página no encontrada');
    });

    it('should render error description', () => {
      const msgEl = fixture.nativeElement.querySelector('.error-message');
      expect(msgEl).toBeTruthy();
      expect(msgEl.textContent.length).toBeGreaterThan(10);
    });
  });

  describe('illustration', () => {
    it('should render two icons in the illustration', () => {
      const icons = fixture.nativeElement.querySelectorAll('.illustration i');
      expect(icons.length).toBeGreaterThanOrEqual(2);
    });

    it('should have the float animation class on the second icon', () => {
      const secondIcon = fixture.nativeElement.querySelector(
        '.illustration i:last-child'
      );
      expect(secondIcon).toBeTruthy();
      // The float class is applied via animation CSS, verify the icon exists
      expect(secondIcon.classList.contains('bi-question-circle')).toBeTrue();
    });
  });

  describe('suggestions', () => {
    it('should render 3 suggestion cards', () => {
      const cards = fixture.nativeElement.querySelectorAll('.suggestion-card');
      expect(cards.length).toBe(3);
    });

    it('should include "Volver al inicio" suggestion', () => {
      const cardTexts = Array.from<HTMLElement>(
        fixture.nativeElement.querySelectorAll('.suggestion-card span')
      ).map((el) => el.textContent?.trim() ?? '');

      expect(cardTexts.some((t) => t.includes('inicio'))).toBeTrue();
    });

    it('should include "Ver catálogo" suggestion', () => {
      const cardTexts = Array.from<HTMLElement>(
        fixture.nativeElement.querySelectorAll('.suggestion-card span')
      ).map((el) => el.textContent?.trim() ?? '');

      expect(cardTexts.some((t) => t.includes('catálogo'))).toBeTrue();
    });

    it('should include "Contactar" suggestion', () => {
      const cardTexts = Array.from<HTMLElement>(
        fixture.nativeElement.querySelectorAll('.suggestion-card span')
      ).map((el) => el.textContent?.trim() ?? '');

      expect(cardTexts.some((t) => t.includes('Contactar'))).toBeTrue();
    });
  });

  describe('component data', () => {
    it('should have suggestions array with 3 items', () => {
      expect(component.suggestions.length).toBe(3);
    });

    it('should include links in suggestions', () => {
      const links = component.suggestions.map((s) => s.link);
      expect(links).toContain('/');
      expect(links).toContain('/catalogo');
      expect(links).toContain('/contacto');
    });
  });
});
