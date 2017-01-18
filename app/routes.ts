import { Route, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

import { LoginComponent } from './components/login/login.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';

import { WaitingroomComponent } from './components/waitingroom/waitingroom.component';
import { RoomComponent } from './components/room/room.component';

// zrobić redirect na login jeśli nie ma sesji
export const routes: Route[] = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'game/minesweeper', component: MinesweeperComponent },
    { path: 'waitingroom', component: WaitingroomComponent },
    { path: 'gameroom', component: RoomComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
