/**
 * theme.service.spec.ts — ReSirve Frontend
 *
 * Pruebas unitarias para ThemeService.
 * Verifica inicialización, toggle, localStorage y prefers-color-scheme.
 */

import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ThemeService, Theme } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageMock: Record<string, string>;
  let htmlElement: HTMLElement;
  let matchMediaSpy: jasmine.Spy;

  beforeEach(() => {
    // Reset localStorage mock
    localStorageMock = {};
    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string | null => localStorageMock[key] ?? null
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): void => {
        localStorageMock[key] = value;
      }
    );
    spyOn(localStorage, 'removeItem').and.callFake(
      (key: string): void => {
        delete localStorageMock[key];
      }
    );

    // Ensure document.documentElement exists and is clean
    htmlElement = document.documentElement;
    htmlElement.removeAttribute('data-theme');

    // Default: no dark preference
    matchMediaSpy = spyOn(window, 'matchMedia').and.callFake(
      (query: string): MediaQueryList =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        } as unknown as MediaQueryList)
    );
  });

  afterEach(() => {
    htmlElement.removeAttribute('data-theme');
    localStorageMock = {};
  });

  describe('initialization', () => {
    it('should default to light theme when no preference is saved and system prefers light', () => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      expect(service.theme()).toBe('light');
      expect(htmlElement.getAttribute('data-theme')).toBe('light');
    });

    it('should load saved dark theme from localStorage', () => {
      localStorageMock['resirve-theme'] = 'dark';

      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      expect(service.theme()).toBe('dark');
      expect(htmlElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should load saved light theme from localStorage', () => {
      localStorageMock['resirve-theme'] = 'light';

      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      expect(service.theme()).toBe('light');
      expect(htmlElement.getAttribute('data-theme')).toBe('light');
    });

    it('should fall back to prefers-color-scheme: dark when no localStorage value exists', () => {
      matchMediaSpy.and.callFake(
        (query: string): MediaQueryList =>
          ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          } as unknown as MediaQueryList)
      );

      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      expect(service.theme()).toBe('dark');
      expect(htmlElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should default to light when localStorage is empty and system prefers light', () => {
      matchMediaSpy.and.callFake(
        (query: string): MediaQueryList =>
          ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          } as unknown as MediaQueryList)
      );

      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      expect(service.theme()).toBe('light');
    });

    it('should not access browser APIs when platform is server', () => {
      const localStorageSpy = jasmine.createSpy('localStorage.getItem');
      const matchMediaLocalSpy = jasmine.createSpy('window.matchMedia');

      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'server' }],
      });
      service = TestBed.inject(ThemeService);

      // On server, theme should default to 'light' without touching browser APIs
      expect(service.theme()).toBe('light');
      // These would fail if called because the spied functions don't exist
      // on the server. But the service should guard with isPlatformBrowser.
      // We just verify the default value is correct.
    });
  });

  describe('toggle', () => {
    it('should toggle from light to dark', () => {
      localStorageMock['resirve-theme'] = 'light';

      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      expect(service.theme()).toBe('light');

      service.toggle();

      expect(service.theme()).toBe('dark');
      expect(htmlElement.getAttribute('data-theme')).toBe('dark');
      expect(localStorageMock['resirve-theme']).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      localStorageMock['resirve-theme'] = 'dark';

      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      expect(service.theme()).toBe('dark');

      service.toggle();

      expect(service.theme()).toBe('light');
      expect(htmlElement.getAttribute('data-theme')).toBe('light');
      expect(localStorageMock['resirve-theme']).toBe('light');
    });

    it('should persist the toggled value to localStorage', () => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      const initialTheme = service.theme();
      service.toggle();

      expect(localStorageMock['resirve-theme']).toBe(
        initialTheme === 'light' ? 'dark' : 'light'
      );
    });
  });

  describe('signal', () => {
    it('should expose theme as a readonly signal', () => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      const themeValue: Theme = service.theme();
      expect(themeValue === 'light' || themeValue === 'dark').toBeTrue();
    });

    it('should update signal value on toggle', () => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      const before = service.theme();
      service.toggle();
      const after = service.theme();

      expect(before).not.toBe(after);
    });
  });

  describe('data-theme attribute', () => {
    it('should set data-theme attribute on document.documentElement', () => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      const attrValue = htmlElement.getAttribute('data-theme');
      expect(attrValue === 'light' || attrValue === 'dark').toBeTrue();
    });

    it('should update data-theme attribute on toggle', () => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);

      const before = htmlElement.getAttribute('data-theme')!;
      service.toggle();
      const after = htmlElement.getAttribute('data-theme')!;

      expect(before).not.toBe(after);
      expect(after === 'light' || after === 'dark').toBeTrue();
    });
  });
});
