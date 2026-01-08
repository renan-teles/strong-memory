import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SoundService } from './core/services/sound/sound.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly sounds = inject(SoundService);

  @HostListener('document:click')
  startMusicOnce(): void{
    this.sounds.enablePlaySound();
  }
}
