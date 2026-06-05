/**
 * footer.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para FooterComponent.
 * Verifica creación, columnas, links y datos de contacto.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should display the brand name', () => {
      const footer = fixture.nativeElement as HTMLElement;
      const brand = footer.querySelector('.footer-brand h3');
      expect(brand?.textContent).toContain('Re');
      expect(brand?.textContent).toContain('Sirve');
    });
  });

  describe('social links', () => {
    it('should render three social media links', () => {
      const socialLinks = fixture.nativeElement.querySelectorAll(
        '.footer-social .social-link'
      ) as NodeListOf<HTMLElement>;
      expect(socialLinks.length).toBe(3);
    });

    it('should have a WhatsApp link', () => {
      const socialLinks = fixture.nativeElement.querySelectorAll(
        '.footer-social .social-link'
      ) as NodeListOf<HTMLElement>;
      const waLink = Array.from(socialLinks).find(
        (el) => el.getAttribute('aria-label')?.includes('WhatsApp') ?? false
      );
      expect(waLink).toBeTruthy();
      expect(waLink?.getAttribute('href')).toContain('wa.me/5491112345678');
    });
  });

  describe('navigation column', () => {
    it('should render 4 navigation links', () => {
      const columns = fixture.nativeElement.querySelectorAll(
        '.footer-column'
      ) as NodeListOf<HTMLElement>;
      let navLinks: HTMLElement[] = [];
      columns.forEach((col) => {
        const title = col.querySelector('.footer-title');
        if (title?.textContent?.includes('NAVEGACIÓN')) {
          navLinks = Array.from(
            col.querySelectorAll<HTMLElement>('.footer-links a')
          );
        }
      });
      expect(navLinks.length).toBe(4);
    });
  });

  describe('categories column', () => {
    it('should render 6 category links including Ropa and Hogar', () => {
      const columns = fixture.nativeElement.querySelectorAll(
        '.footer-column'
      ) as NodeListOf<HTMLElement>;
      let categoryLinks: HTMLElement[] = [];
      columns.forEach((col) => {
        const title = col.querySelector('.footer-title');
        if (title?.textContent?.includes('CATEGORÍAS')) {
          categoryLinks = Array.from(
            col.querySelectorAll<HTMLElement>('.footer-links a')
          );
        }
      });
      expect(categoryLinks.length).toBe(6);

      const texts = categoryLinks.map(
        (el) => el.textContent?.trim() ?? ''
      );
      expect(texts.some((t) => t.includes('Ropa'))).toBeTrue();
      expect(texts.some((t) => t.includes('Hogar'))).toBeTrue();
    });
  });

  describe('contact column', () => {
    it('should display contact email hola@resirve.com', () => {
      const footer = fixture.nativeElement as HTMLElement;
      expect(footer.textContent).toContain('hola@resirve.com');
    });

    it('should display Buenos Aires, Argentina', () => {
      const footer = fixture.nativeElement as HTMLElement;
      expect(footer.textContent).toContain('Buenos Aires, Argentina');
    });

    it('should display WhatsApp contact number', () => {
      const footer = fixture.nativeElement as HTMLElement;
      expect(footer.textContent).toContain('+54 9 11 31234-5678');
    });

    it('should have a clickable WhatsApp link with correct href', () => {
      const waLink = fixture.nativeElement.querySelector(
        '.footer-contact a[href*="wa.me"]'
      ) as HTMLAnchorElement | null;
      expect(waLink).toBeTruthy();
      expect(waLink?.getAttribute('href')).toContain('wa.me/5491112345678');
    });
  });

  describe('navigation links routing', () => {
    it('should have Inicio link pointing to home', () => {
      const columns: HTMLElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.footer-column')
      );
      let inicioLink: HTMLAnchorElement | null = null;
      for (const col of columns) {
        const title = col.querySelector('.footer-title');
        if (title?.textContent?.includes('NAVEGACIÓN')) {
          const links: HTMLAnchorElement[] = Array.from(
            col.querySelectorAll('.footer-links a')
          );
          inicioLink =
            links.find((a) => a.textContent?.trim() === 'Inicio') ?? null;
          break;
        }
      }
      expect(inicioLink).toBeTruthy();
      expect(inicioLink!.getAttribute('href')).toBe('/');
    });

    it('should have Ropa category link pointing to /categoria/ropa', () => {
      const columns: HTMLElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.footer-column')
      );
      let ropaLink: HTMLAnchorElement | null = null;
      for (const col of columns) {
        const title = col.querySelector('.footer-title');
        if (title?.textContent?.includes('CATEGORÍAS')) {
          const links: HTMLAnchorElement[] = Array.from(
            col.querySelectorAll('.footer-links a')
          );
          ropaLink =
            links.find((a) => a.textContent?.trim() === 'Ropa') ?? null;
          break;
        }
      }
      expect(ropaLink).toBeTruthy();
      expect(ropaLink!.getAttribute('href')).toBe('/categoria/ropa');
    });
  });

  describe('bottom bar', () => {
    it('should display current year in copyright', () => {
      const footer = fixture.nativeElement as HTMLElement;
      const currentYear = new Date().getFullYear().toString();
      expect(footer.textContent).toContain(`© ${currentYear}`);
    });

    it('should have privacy policy and terms links', () => {
      const footer = fixture.nativeElement as HTMLElement;
      expect(footer.textContent).toContain('Privacidad');
      expect(footer.textContent).toContain('Términos');
    });
  });
});
