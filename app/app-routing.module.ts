import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GameRoomComponent } from './components/gameRoom/gameRoom.component';
import { WaitingRoomComponent } from './components/waitingRoom/waitingRoom.component';

import { SocketService } from './services/socket.service';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'gameroom/:name', component: GameRoomComponent, canActivate:[SocketService] },
    { path: 'waitingroom', component: WaitingRoomComponent, canActivate:[SocketService] },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{ useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}