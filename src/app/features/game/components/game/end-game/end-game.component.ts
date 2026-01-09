import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScoreFacade } from '../../../facade/score/score.facade';
import { ThemeService } from '../../../../../core/services/theme-service/theme.service';

@Component({
  selector: 'app-end-game',
  imports: [RouterLink],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css',
})
export class EndGameComponent implements OnDestroy{
  private readonly scoreFacade = inject(ScoreFacade);

  private readonly theme = inject(ThemeService);
  themeClass = this.theme.themeClass;

  score = this.scoreFacade.score;

  ngOnDestroy(): void {
    this.scoreFacade.resetScore();
  }
}
