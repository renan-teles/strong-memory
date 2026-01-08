import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private playSounds: boolean = false;
  private sounds: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    this.loadSounds();
  }

  private loadSounds(): void {
    this.sounds.set('wrong', new Audio('assets/sounds/wrong.mp3'));
    this.sounds.set('correct', new Audio('assets/sounds/correct.mp3'));
    this.sounds.set('end', new Audio('assets/sounds/end.mp3'));
    this.sounds.set('time-running-out', new Audio('assets/sounds/time-running-out.mp3'));
    this.sounds.set('go', new Audio('assets/sounds/go.mp3'));

    this.sounds.forEach(sound => {
      sound.volume = 0.3;
    });
  }

  enablePlaySound(): void {
    if(!this.playSounds){
      this.playSounds = true;
    }
  }
  
  playSound(name: string, loop: boolean = false): void {
    if(!this.playSounds) return;
    
    const sound = this.getSoundByKey(name);
    if(!sound!.paused) return;
    
    sound!.loop = loop;
    sound!.currentTime = 0;
    sound!.play();
  }

  stopSound(name: string): void {
    this.stopSoundPrivate(this.getSoundByKey(name));
  }
  
  stopAllSounds(): void{
    this.sounds.forEach(sound => this.stopSoundPrivate(sound));
  }
  
  private stopSoundPrivate(sound: HTMLAudioElement): void{
    if(sound!.paused) return;
    sound!.loop = false;
    sound!.pause();
    sound!.currentTime = 0;
  }

  private getSoundByKey(key: string): any {
    if (!this.sounds.has(key)) {
      throw new Error(`Áudio com chave '${key}' não encontrado.`);
    }
    return this.sounds.get(key);
  }
}
