import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _isDark = signal<boolean>(false);
  readonly isDark = this._isDark.asReadonly();

  readonly themeClass = computed(() => (this._isDark() ? 'text-bg-dark' : 'text-bg-white'));
  readonly blackOrLightThemeClass = computed(() => (this._isDark() ? 'text-bg-black' : 'text-bg-light'));
  readonly themeIcon = computed(() =>
    this._isDark() ? 'bi-brightness-high-fill color-orange' : 'bi-moon-fill color-purple'
  );

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this._isDark.set(true);
    }

    effect(() => {
      localStorage.setItem('theme', this._isDark() ? 'dark' : 'light');
    });
  }

  toggleTheme(): void {
    this._isDark.update((v) => !v);
  }

  setDark(): void {
    this._isDark.set(true);
  }

  setLight(): void {
    this._isDark.set(false);
  }
}
