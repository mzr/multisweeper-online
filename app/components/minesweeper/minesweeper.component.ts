<<<<<<< HEAD
import { Component,OnInit,OnDestroy,Input } from '@angular/core';
import { RowComponent } from './row.component';
import { SocketService } from '../../services/socket.service';
=======
import { Component,OnInit,OnDestroy } from '@angular/core';
import { RowComponent } from './row.component';
>>>>>>> master

@Component({
    selector: 'minesweeper',
    template: `
    <div class="board">
<<<<<<< HEAD
        <row *ngFor="let row of gameBoard" [tiles]="row"></row>
=======
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
>>>>>>> master
    </div>
    `,
    styles: [`
    .board {
        margin-top: 25px;
    }
`]
})
export class MinesweeperComponent implements OnInit,OnDestroy {

<<<<<<< HEAD
    @Input() gameBoard; //dwu-wymiarowa tablica.

    constructor(private socketSerice : SocketService) {}

    ngOnInit(){
        console.log(JSON.stringify(this.gameBoard));
=======
    constructor(){

    }

    ngOnInit(){

>>>>>>> master
    }

    ngOnDestroy(){

    }
}