import { Component, EventEmitter, Output } from '@angular/core';
import { WordsListComponent } from '../../general/lists/words-list/words-list.component';

@Component({
  selector: 'app-no-time-left',
  imports: [WordsListComponent],
  templateUrl: './no-time-left.component.html',
  styleUrl: './no-time-left.component.css',
})
export class NoTimeLeftComponent {
  @Output() reset = new EventEmitter<void>();

  onReset(): void{
    this.reset.emit();
  }
}
