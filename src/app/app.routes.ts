import { Routes } from '@angular/router';
import { StartPage } from './features/game/pages/start/start.page';
import { GamePage } from './features/game/pages/game/game.page';

export const routes: Routes = [
    {path: 'start', component: StartPage},
    {path: 'game', component: GamePage},

    { path: '', redirectTo: 'start', pathMatch: 'full' },
    { path: '**', component: StartPage }
];
