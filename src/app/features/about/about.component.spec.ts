/**
 * about.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para AboutComponent.
 * Verifica creación, hero, features, stats, values y CTA.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('hero section', () => {
    it('should render the hero title with ReSirve accent', () => {
      const titleEl = fixture.nativeElement.querySelector('.hero__title');
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toContain('Acerca de');
      const accent = titleEl.querySelector('.accent');
      expect(accent).toBeTruthy();
      expect(accent.textContent).toContain('ReSirve');
    });

    it('should render hero subtitle', () => {
      const subtitleEl = fixture.nativeElement.querySelector('.hero__subtitle');
      expect(subtitleEl).toBeTruthy();
      expect(subtitleEl.textContent.length).toBeGreaterThan(10);
    });
  });

  describe('features section', () => {
    it('should render 4 feature cards', () => {
      const cards = fixture.nativeElement.querySelectorAll('.feature-card');
      expect(cards.length).toBe(4);
    });

    it('should render "¿Por qué elegir ReSirve?" heading', () => {
      const heading = fixture.nativeElement.querySelector('.features .section__title');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('Por qué elegir');
    });
  });

  describe('stats section', () => {
    it('should render 3 stat cards', () => {
      const statCards = fixture.nativeElement.querySelectorAll('.stat-card');
      expect(statCards.length).toBe(3);
    });

    it('should display stat numbers as strings', () => {
      const statNumbers = fixture.nativeElement.querySelectorAll('.stat-card__number');
      expect(statNumbers.length).toBe(3);
      // First stat should be "500+"
      expect(statNumbers[0].textContent).toContain('500');
    });
  });

  describe('values section', () => {
    it('should render 3 value cards', () => {
      const valueCards = fixture.nativeElement.querySelectorAll('.value-card');
      expect(valueCards.length).toBe(3);
    });

    it('should render values heading', () => {
      const heading = fixture.nativeElement.querySelector('.values .section__title');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('Valores');
    });
  });

  describe('CTA section', () => {
    it('should render CTA with catalog and contact links', () => {
      const ctaLinks: NodeListOf<HTMLAnchorElement> =
        fixture.nativeElement.querySelectorAll('.cta__actions a');
      const hrefs = Array.from(ctaLinks).map((a) => a.getAttribute('href'));

      expect(hrefs.some((h) => h?.includes('catalogo'))).toBeTrue();
      expect(hrefs.some((h) => h?.includes('contacto'))).toBeTrue();
    });
  });

  describe('component data', () => {
    it('should have features array with 4 items', () => {
      expect(component.features.length).toBe(4);
    });

    it('should have stats array with 3 items', () => {
      expect(component.stats.length).toBe(3);
    });
  });
});
