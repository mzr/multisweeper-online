import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
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


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        JsonpModule,
        routing,
        CommonModule,
        CoreModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        LoginComponent,
        MinesweeperComponent,
        RowComponent,
        TileComponent,
        ChatComponent,
        RoomComponent,
        WaitingroomComponent
    ],
    bootstrap: [ AppComponent ],
    providers : [
        
    ]
})
export class AppModule { }
