import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AboutComponent } from "./components/about/about.component";
import { routing } from "./routes";
import { HomeComponent } from "./components/home/home.component";

import { LoginComponent } from './components/login/login.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { RowComponent } from './components/minesweeper/row.component';
import { TileComponent } from './components/minesweeper/tile.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        LoginComponent,
        MinesweeperComponent,
        RowComponent,
        TileComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
