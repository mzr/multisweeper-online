import { Component,OnInit,OnDestroy,Input } from '@angular/core';
import { RowComponent } from './row.component';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'minesweeper',
    template: `
    <div class="board">
        <row *ngFor="let row of gameBoard" [tiles]="row"></row>
    </div>
    `,
    styles: [`
    .board {
        margin-top: 25px;
    }
`]
})
export class MinesweeperComponent implements OnInit,OnDestroy {

    @Input() gameBoard; //dwu-wymiarowa tablica.

    constructor(private socketSerice : SocketService) {}

    ngOnInit(){
        // console.log(JSON.stringify(this.gameBoard));
    }

    ngOnDestroy(){

    }
}