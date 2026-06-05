/**
 * navbar.component.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para NavbarComponent.
 * Verifica creación, toggle mobile, theme toggle, search bar y links.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { ThemeService } from '@core/services';

describe('NavbarComponent', () => {
  /** Fixture and component for the default (light theme) setup. */
  describe('with light theme', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let themeToggleSpy: jasmine.Spy;

    beforeEach(async () => {
      const themeMock = {
        theme: jasmine.createSpy('theme').and.returnValue('light'),
        toggle: jasmine.createSpy('toggle'),
      };
      themeToggleSpy = themeMock.toggle;

      await TestBed.configureTestingModule({
        imports: [NavbarComponent],
        providers: [
          provideRouter([]),
          { provide: ThemeService, useValue: themeMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('creation', () => {
      it('should create the component', () => {
        expect(component).toBeTruthy();
      });

      it('should display the brand name text', () => {
        const brand = fixture.nativeElement.querySelector('.navbar-brand');
        expect(brand).toBeTruthy();
        expect(brand.textContent).toContain('Re');
        expect(brand.textContent).toContain('Sirve');
      });
    });

    describe('navigation links', () => {
      it('should render links with Spanish text for all sections', () => {
        const links: NodeListOf<HTMLElement> =
          fixture.nativeElement.querySelectorAll('.nav-link');
        const linkTexts: string[] = Array.from(links).map(
          (el: HTMLElement) => el.textContent?.trim() ?? ''
        );

        expect(linkTexts.length).toBeGreaterThanOrEqual(4);
        expect(linkTexts.some((t: string) => t.includes('Inicio'))).toBeTrue();
        expect(linkTexts.some((t: string) => t.includes('Catálogo'))).toBeTrue();
        expect(linkTexts.some((t: string) => t.includes('Acerca de'))).toBeTrue();
        expect(linkTexts.some((t: string) => t.includes('Contacto'))).toBeTrue();
      });

      it('should render exactly 4 navigation links', () => {
        const links: NodeListOf<HTMLElement> =
          fixture.nativeElement.querySelectorAll('.nav-link');
        // No CTA button link; only the 4 nav items
        expect(links.length).toBe(4);
      });
    });

    describe('search bar', () => {
      it('should render search input with the correct placeholder', () => {
        const searchInput: HTMLInputElement | null =
          fixture.nativeElement.querySelector('.navbar-search input');
        expect(searchInput).toBeTruthy();
        expect(searchInput?.getAttribute('placeholder')).toBe(
          'Buscar productos...'
        );
      });

      it('should have search input of type text', () => {
        const searchInput: HTMLInputElement | null =
          fixture.nativeElement.querySelector('.navbar-search input');
        expect(searchInput?.type).toBe('text');
      });
    });

    describe('theme toggle', () => {
      it('should render theme toggle button', () => {
        const themeBtn: HTMLElement | null =
          fixture.nativeElement.querySelector('.navbar-theme-toggle');
        expect(themeBtn).toBeTruthy();
      });

      it('should call ThemeService.toggle() when theme button is clicked', () => {
        const themeBtn: HTMLElement | null =
          fixture.nativeElement.querySelector('.navbar-theme-toggle');
        themeBtn?.click();
        fixture.detectChanges();

        expect(themeToggleSpy).toHaveBeenCalled();
      });

      it('should show moon icon (bi-moon-fill) in light mode', () => {
        const themeBtn: HTMLElement | null =
          fixture.nativeElement.querySelector('.navbar-theme-toggle');
        const icon = themeBtn?.querySelector('i');
        expect(icon?.classList.contains('bi-moon-fill')).toBeTrue();
      });

      it('should have aria-label "Activar modo oscuro" in light mode', () => {
        const themeBtn: HTMLElement | null =
          fixture.nativeElement.querySelector('.navbar-theme-toggle');
        expect(themeBtn?.getAttribute('aria-label')).toBe(
          'Activar modo oscuro'
        );
      });
    });

    describe('mobile menu toggle', () => {
      it('should have a hamburger button for mobile menu', () => {
        const hamburger: HTMLElement | null =
          fixture.nativeElement.querySelector('.navbar-toggler');
        expect(hamburger).toBeTruthy();
      });

      it('should toggle aria-expanded when hamburger is clicked', () => {
        const hamburger: HTMLElement | null =
          fixture.nativeElement.querySelector('.navbar-toggler');

        expect(hamburger?.getAttribute('aria-expanded')).toBe('false');

        (hamburger as HTMLElement).click();
        fixture.detectChanges();
        expect(hamburger?.getAttribute('aria-expanded')).toBe('true');

        (hamburger as HTMLElement).click();
        fixture.detectChanges();
        expect(hamburger?.getAttribute('aria-expanded')).toBe('false');
      });

      it('should show close icon (bi-x-lg) when menu is open', () => {
        const hamburger: HTMLElement | null =
          fixture.nativeElement.querySelector('.navbar-toggler');

        const closedIcon = hamburger?.querySelector('i');
        expect(closedIcon?.classList.contains('bi-list')).toBeTrue();

        (hamburger as HTMLElement).click();
        fixture.detectChanges();
        const openIcon = hamburger?.querySelector('i');
        expect(openIcon?.classList.contains('bi-x-lg')).toBeTrue();

        (hamburger as HTMLElement).click();
        fixture.detectChanges();
        const closedIcon2 = hamburger?.querySelector('i');
        expect(closedIcon2?.classList.contains('bi-list')).toBeTrue();
      });

      it('should close menu when a navigation link is clicked', () => {
        const hamburger: HTMLElement =
          fixture.nativeElement.querySelector('.navbar-toggler');

        // Open the menu first
        hamburger.click();
        fixture.detectChanges();
        expect(hamburger.getAttribute('aria-expanded')).toBe('true');

        // Click a navigation link to close
        const firstLink: HTMLElement =
          fixture.nativeElement.querySelector('.nav-link');
        firstLink.click();
        fixture.detectChanges();

        expect(hamburger.getAttribute('aria-expanded')).toBe('false');
      });
    });
  });

  /** Separate context to test dark theme icon behavior. */
  describe('with dark theme', () => {
    let darkFixture: ComponentFixture<NavbarComponent>;

    beforeEach(async () => {
      const darkThemeMock = {
        theme: jasmine.createSpy('theme').and.returnValue('dark'),
        toggle: jasmine.createSpy('toggle'),
      };

      await TestBed.configureTestingModule({
        imports: [NavbarComponent],
        providers: [
          provideRouter([]),
          { provide: ThemeService, useValue: darkThemeMock },
        ],
      }).compileComponents();

      darkFixture = TestBed.createComponent(NavbarComponent);
      darkFixture.detectChanges();
    });

    it('should show sun icon (bi-sun-fill) in dark mode', () => {
      const themeBtn: HTMLElement | null =
        darkFixture.nativeElement.querySelector('.navbar-theme-toggle');
      const icon = themeBtn?.querySelector('i');
      expect(icon?.classList.contains('bi-sun-fill')).toBeTrue();
    });

    it('should have aria-label "Activar modo claro" in dark mode', () => {
      const themeBtn: HTMLElement | null =
        darkFixture.nativeElement.querySelector('.navbar-theme-toggle');
      expect(themeBtn?.getAttribute('aria-label')).toBe('Activar modo claro');
    });
  });
});
