import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StartFormComponent } from '../../components/forms/start-form/start-form.component';

@Component({
  selector: 'app-start-page',
  imports: [CommonModule, StartFormComponent],
  templateUrl: './start.page.html',
  styleUrl: './start.page.css',
})
export class StartPage {
  private readonly route = inject(Router);

  redirectToGame(category: string): void {
    this.route.navigate(['/game'], {
      queryParams: {
        wc: category
      }
    });
  }
}
