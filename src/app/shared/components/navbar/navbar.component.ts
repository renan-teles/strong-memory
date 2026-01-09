import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme-service/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly theme = inject(ThemeService);
  themeClass = this.theme.themeClass;
  themeIcon = this.theme.themeIcon;
  isDark = this.theme.isDark;

  toggleTheme(): void {
    this.theme.toggleTheme();
  }
}
