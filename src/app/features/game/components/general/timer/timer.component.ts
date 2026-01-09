import { CommonModule } from '@angular/common';
import { Component, computed, inject, output, signal, effect, OnDestroy, input,} from '@angular/core';
import { SoundService } from '../../../../../core/services/sound/sound.service';
import { ThemeService } from '../../../../../core/services/theme-service/theme.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnDestroy {
  initialTime = input.required<number>();
  finished = output<void>();

  private readonly theme = inject(ThemeService);
  isDark = this.theme.isDark;
  
  private readonly sounds = inject(SoundService);
  private readonly SOUND_NAME = 'time-running-out';
  readonly time = signal<number>(0);
  
  private intervalId: any = null;
  
  constructor() {
    effect(() => {
      if (this.initialTime() > 0) this.resetTimer();
    });

    effect(() => {
      if (this.percent() < 33) 
        this.sounds.playSound(this.SOUND_NAME, true);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.sounds.stopSound(this.SOUND_NAME);
  }

  private resetTimer(): void {
    clearInterval(this.intervalId);
    this.sounds.stopSound(this.SOUND_NAME);

    this.time.set(this.initialTime());
    this.startTimer();
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
     
      this.time.update(t => {
        if (t <= 0) {
          this.sounds.stopSound(this.SOUND_NAME);
          this.finished.emit();
          clearInterval(this.intervalId);
          return 0;
        }

        return t - 1;
      });
    
    }, 1000);
  }

  readonly percent = computed(() =>
    this.initialTime() > 0
      ? (this.time() / this.initialTime()) * 100
      : 0
  );

  readonly color = computed<'seagreen' | 'coral' | 'red'>(() => { 
    const p = this.percent(); 
    if (p < 33) return 'red'; 
    if (p < 66) return 'coral'; 
    return 'seagreen'; 
  });
}
