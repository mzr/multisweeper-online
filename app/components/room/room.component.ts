import { Component,OnInit,OnDestroy } from '@angular/core';

@Component({
    selector: 'room',
    template: `
    <div>
        <nav>
            <button>Jakaś nawigacja</button>
        </nav>
        <minesweeper></minesweeper>
        <chat></chat>
    </div>
    `
})
export class RoomComponent implements OnInit,OnDestroy {

    constructor(){

    }

    ngOnInit(){

    }

    ngOnDestroy(){

    }
}