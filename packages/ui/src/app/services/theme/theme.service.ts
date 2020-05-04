import { Injectable } from '@angular/core';

const themePrefix = 'theme--';
const themeKey = `dnd-theme`;

export enum Theme {
  light = 'light',
  dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _currentTheme: Theme;

  constructor() {
    const savedTheme = window.localStorage.getItem(themeKey);
    if (savedTheme) {
      this.setTheme(savedTheme as Theme, false);
    } else {
      // default theme
      this.setTheme(Theme.light, false);
    }
  }

  get current() {
    return this._currentTheme;
  }

  setTheme(theme: Theme, save = true) {
    document.body.classList
      .toString()
      .split(' ')
      .filter((clss) => clss.startsWith(themePrefix))
      .forEach((clss) => document.body.classList.remove(clss));
    document.body.classList.add(`${themePrefix}${theme}`);

    if (save) {
      window.localStorage.setItem(themeKey, theme);
    }

    this._currentTheme = theme;
  }
}
