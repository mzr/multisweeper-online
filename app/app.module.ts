import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
<<<<<<< HEAD
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { GameRoomComponent } from './components/gameRoom/gameRoom.component';
import { WaitingRoomComponent } from './components/waitingRoom/waitingRoom.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { TileComponent } from './components/minesweeper/tile.component';
import { RowComponent } from './components/minesweeper/row.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
=======
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { AboutComponent } from "./components/about/about.component";
import { routing } from "./routes";

import { LoginComponent } from './components/login/login.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { RowComponent } from './components/minesweeper/row.component';
import { TileComponent } from './components/minesweeper/tile.component';

import { ChatComponent } from './components/chat/chat.component';
import { RoomComponent } from './components/room/room.component';

import { WaitingroomComponent } from './components/waitingroom/waitingroom.component';

import { CommonModule } from '@angular/common';
import { CoreModule } from './core.module'; // creates single instance SocketService
>>>>>>> master


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        JsonpModule,
<<<<<<< HEAD
        AppRoutingModule,
        FormsModule,
=======
        routing,
        CommonModule,
>>>>>>> master
        CoreModule
    ],
    declarations: [
        AppComponent,
<<<<<<< HEAD
        LoginComponent,
        WaitingRoomComponent,
        GameRoomComponent,
        MinesweeperComponent,
        TileComponent,
        RowComponent,
        ChatComponent
=======
        AboutComponent,
        LoginComponent,
        MinesweeperComponent,
        RowComponent,
        TileComponent,
        ChatComponent,
        RoomComponent,
        WaitingroomComponent
>>>>>>> master
    ],
    bootstrap: [ AppComponent ],
    providers : [
        
    ]
})
export class AppModule { }
