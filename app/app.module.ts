import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
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


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        AppRoutingModule,
        FormsModule,
        CoreModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        WaitingRoomComponent,
        GameRoomComponent,
        MinesweeperComponent,
        TileComponent,
        RowComponent,
        ChatComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
