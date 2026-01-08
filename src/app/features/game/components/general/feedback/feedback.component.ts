import { Component, computed, inject } from '@angular/core';
import { UserFacade } from '../../../facade/user/user.facade';

@Component({
  selector: 'app-feedback',
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  private readonly userFacade = inject(UserFacade);

  readonly feedback = computed(() => {  
    return (this.userFacade.isCorrect()) 
      ? { text: 'Correto', class: 'text-success', icon: 'bi-check-circle-fill' } 
      : { text: 'Incorreto', class: 'text-danger', icon: 'bi-x-circle-fill' }; 
    }); 
}
