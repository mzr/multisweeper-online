import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { WaitingroomComponent } from './components/waitingroom/waitingroom.component';
import { RoomComponent } from './components/room/room.component';
import { SocketService } from './services/socket.service';

export const routes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'waitingroom', component: WaitingroomComponent, canActivate:[SocketService] },
    { path: 'gameroom', component: RoomComponent, canActivate:[SocketService] },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
