/**
 * badge.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para BadgeComponent.
 * Verifica renderizado de variantes de status y condición.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  describe('creation', () => {
    it('should create the component', () => {
      fixture.componentRef.setInput('status', 'disponible');
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });

  describe('disponible variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('status', 'disponible');
      fixture.detectChanges();
    });

    it('should render text "Disponible"', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent?.trim()).toContain('Disponible');
    });

    it('should have the correct badge class', () => {
      const badge: HTMLElement =
        fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('badge--disponible')).toBeTrue();
    });
  });

  describe('reservado variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('status', 'reservado');
      fixture.detectChanges();
    });

    it('should render text "Reservado"', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent?.trim()).toContain('Reservado');
    });

    it('should have the correct badge class', () => {
      const badge: HTMLElement =
        fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('badge--reservado')).toBeTrue();
    });
  });

  describe('vendido variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('status', 'vendido');
      fixture.detectChanges();
    });

    it('should render text "Vendido"', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent?.trim()).toContain('Vendido');
    });

    it('should have the correct badge class', () => {
      const badge: HTMLElement =
        fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('badge--vendido')).toBeTrue();
    });
  });

  describe('excellent variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('status', 'excellent');
      fixture.detectChanges();
    });

    it('should render text "Excelente"', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent?.trim()).toContain('Excelente');
    });

    it('should have the correct badge class', () => {
      const badge: HTMLElement =
        fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('badge--excellent')).toBeTrue();
    });
  });

  describe('good variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('status', 'good');
      fixture.detectChanges();
    });

    it('should render text "Bueno"', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent?.trim()).toContain('Bueno');
    });

    it('should have the correct badge class', () => {
      const badge: HTMLElement =
        fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('badge--good')).toBeTrue();
    });
  });

  describe('fair variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('status', 'fair');
      fixture.detectChanges();
    });

    it('should render text "Regular"', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent?.trim()).toContain('Regular');
    });

    it('should have the correct badge class', () => {
      const badge: HTMLElement =
        fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('badge--fair')).toBeTrue();
    });
  });

  describe('featured variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('status', 'featured');
      fixture.detectChanges();
    });

    it('should render text "Destacado"', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.textContent?.trim()).toContain('Destacado');
    });

    it('should have the correct badge class', () => {
      const badge: HTMLElement =
        fixture.nativeElement.querySelector('.badge');
      expect(badge.classList.contains('badge--featured')).toBeTrue();
    });
  });
});
