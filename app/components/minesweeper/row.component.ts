<<<<<<< HEAD
import { Component,Input,OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> master
import { TileComponent } from './tile.component';

@Component({
    selector: 'row',
    template: `
    <div class="row">
<<<<<<< HEAD
        <tile *ngFor="let tile of tiles"></tile>
=======
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
>>>>>>> master
    </div>
    `,
    styles: [`
    .row {
        margin: 0;
    }
`],
})
<<<<<<< HEAD
export class RowComponent implements OnInit {
    @Input() tiles;

    constructor(){

    }

    ngOnInit(){
        // console.log(this.tiles);
    }
=======
export class RowComponent {
    
>>>>>>> master
}