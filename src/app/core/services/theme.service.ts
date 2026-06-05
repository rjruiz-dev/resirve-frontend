/**
 * theme.service.ts — ReSirve Frontend
 *
 * Servicio de tema para light/dark mode.
 * Persiste la preferencia en localStorage,
 * aplica data-theme en <html> y usa prefers-color-scheme como fallback.
 */

import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Tipo que representa el tema actual.
 */
export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'resirve-theme';
  private readonly platformId = inject(PLATFORM_ID);

  /** Señal privada que mantiene el estado del tema. */
  private readonly themeSignal = signal<Theme>('light');

  /** Señal de solo lectura expuesta a los consumidores. */
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  /**
   * Inicializa el tema desde localStorage, con fallback a prefers-color-scheme.
   * Solo se ejecuta en el navegador.
   */
  private init(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const initial = saved ?? preferred;
    this.setTheme(initial);
  }

  /**
   * Alterna entre light y dark.
   */
  toggle(): void {
    const next = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  /**
   * Aplica el tema: actualiza la señal, el atributo data-theme y persiste.
   */
  private setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }
}
