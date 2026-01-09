import { Component, EventEmitter, inject, Output } from '@angular/core';
import { WordsListComponent } from '../../general/lists/words-list/words-list.component';
import { ThemeService } from '../../../../../core/services/theme-service/theme.service';
import { RoundGameFacade } from '../../../facade/round-game/round-game.facade';

@Component({
  selector: 'app-no-time-left',
  imports: [WordsListComponent],
  templateUrl: './no-time-left.component.html',
  styleUrl: './no-time-left.component.css',
})
export class NoTimeLeftComponent {
  private readonly roudFacade = inject(RoundGameFacade);

  private readonly theme = inject(ThemeService);
  themeClass = this.theme.themeClass;

  reset(): void{
    this.roudFacade.resetGame();
  }
}
