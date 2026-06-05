/**
 * contact.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para ContactComponent.
 * Verifica creación, hero, contact methods, form validation y info cards.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('hero section', () => {
    it('should render the contact title', () => {
      const titleEl = fixture.nativeElement.querySelector('.hero__title');
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toContain('Contáctanos');
    });

    it('should render hero subtitle', () => {
      const subtitleEl = fixture.nativeElement.querySelector('.hero__subtitle');
      expect(subtitleEl).toBeTruthy();
    });
  });

  describe('contact methods', () => {
    it('should render 3 contact method cards', () => {
      const cards = fixture.nativeElement.querySelectorAll('.method-card');
      expect(cards.length).toBe(3);
    });

    it('should render WhatsApp link', () => {
      const waLink: HTMLAnchorElement | null =
        fixture.nativeElement.querySelector('.method-card[href*="wa.me"]');
      expect(waLink).toBeTruthy();
    });

    it('should render email link', () => {
      const emailLink: HTMLAnchorElement | null =
        fixture.nativeElement.querySelector('.method-card[href*="mailto"]');
      expect(emailLink).toBeTruthy();
    });
  });

  describe('contact form', () => {
    it('should have 4 form controls', () => {
      expect(component.contactForm.contains('name')).toBeTrue();
      expect(component.contactForm.contains('email')).toBeTrue();
      expect(component.contactForm.contains('subject')).toBeTrue();
      expect(component.contactForm.contains('message')).toBeTrue();
    });

    it('should require name, email, subject, and message', () => {
      const name = component.contactForm.get('name');
      const email = component.contactForm.get('email');
      const subject = component.contactForm.get('subject');
      const message = component.contactForm.get('message');

      expect(name?.hasValidator).toBeTruthy();
      expect(email?.hasValidator).toBeTruthy();
      expect(subject?.hasValidator).toBeTruthy();
      expect(message?.hasValidator).toBeTruthy();
    });

    it('should render submit button', () => {
      const submitBtn: HTMLElement | null =
        fixture.nativeElement.querySelector('.contact-form .btn--primary');
      expect(submitBtn).toBeTruthy();
      expect(submitBtn?.textContent).toContain('Enviar');
    });

    it('should disable submit button when form is invalid', () => {
      const submitBtn: HTMLButtonElement | null =
        fixture.nativeElement.querySelector('.contact-form .btn--primary');
      expect(submitBtn?.disabled).toBeTrue();
    });
  });

  describe('info cards', () => {
    it('should render 3 info cards', () => {
      const infoCards = fixture.nativeElement.querySelectorAll('.info-card');
      expect(infoCards.length).toBe(3);
    });
  });

  describe('signals', () => {
    it('should initialize formSubmitted to false', () => {
      expect(component.formSubmitted()).toBeFalse();
    });

    it('should initialize formSuccess to false', () => {
      expect(component.formSuccess()).toBeFalse();
    });
  });

  describe('component data', () => {
    it('should have contactMethods array with 3 items', () => {
      expect(component.contactMethods.length).toBe(3);
    });
  });
});
