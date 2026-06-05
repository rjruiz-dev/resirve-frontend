/**
 * home.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para HomeComponent.
 * Verifica creación, contenido del hero, y renderizado de secciones.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('hero section', () => {
    it('should render the hero title with accent span', () => {
      const titleEl = fixture.nativeElement.querySelector('.hero__title');
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toContain('Productos usados');
      const accent = titleEl.querySelector('.hero__title--accent');
      expect(accent).toBeTruthy();
      expect(accent.textContent).toContain('con historia');
    });

    it('should render hero description text', () => {
      const descEl = fixture.nativeElement.querySelector('.hero__description');
      expect(descEl).toBeTruthy();
      expect(descEl.textContent).toContain('historia');
    });

    it('should render CTA buttons linking to catalog and about', () => {
      const links: NodeListOf<HTMLAnchorElement> =
        fixture.nativeElement.querySelectorAll('.hero__actions a');
      const hrefs = Array.from(links).map((a) => a.getAttribute('href'));

      expect(hrefs.some((h) => h?.includes('catalogo'))).toBeTrue();
      expect(hrefs.some((h) => h?.includes('acerca-de'))).toBeTrue();
    });
  });

  describe('why-resirve section', () => {
    it('should render "¿Por qué ReSirve?" section heading', () => {
      const whyTitle = fixture.nativeElement.querySelector('.why-section .section__title');
      expect(whyTitle).toBeTruthy();
      expect(whyTitle.textContent).toContain('Por qué ReSirve');
    });

    it('should render 3 feature cards in the why section', () => {
      const cards = fixture.nativeElement.querySelectorAll('.why-section .why-card');
      expect(cards.length).toBe(3);
    });
  });

  describe('CTA section', () => {
    it('should render CTA title and contact button', () => {
      const ctaTitle = fixture.nativeElement.querySelector('.cta__title');
      expect(ctaTitle).toBeTruthy();
      expect(ctaTitle.textContent).toContain('vender');

      const ctaLink = fixture.nativeElement.querySelector('.cta__actions a');
      expect(ctaLink).toBeTruthy();
      expect(ctaLink.getAttribute('href')).toContain('contacto');
    });
  });
});
