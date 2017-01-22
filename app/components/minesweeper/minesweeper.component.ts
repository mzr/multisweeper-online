import { Component,OnInit,OnDestroy } from '@angular/core';
import { RowComponent } from './row.component';

@Component({
    selector: 'minesweeper',
    template: `
    <div class="board">
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
    </div>
    `,
    styles: [`
    .board {
        margin-top: 25px;
    }
`]
})
export class MinesweeperComponent implements OnInit,OnDestroy {

    constructor(){

    }

    ngOnInit(){

    }

    ngOnDestroy(){

    }
}