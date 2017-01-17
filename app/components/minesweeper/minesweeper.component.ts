import { Component,OnInit,OnDestroy } from '@angular/core';
import { RowComponent } from './row.component';
import { MinesweeperService } from '../../services/minesweeper.service';

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
`],
    providers: [ MinesweeperService ]
})
export class MinesweeperComponent implements OnInit,OnDestroy {

    constructor(private mineService : MinesweeperService ){

    }

    ngOnInit(){

    }

    ngOnDestroy(){

    }
}