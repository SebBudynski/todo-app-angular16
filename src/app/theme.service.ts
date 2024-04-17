import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  switchMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode');
  }
}
