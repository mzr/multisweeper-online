import { Component,Input,OnInit } from '@angular/core';
import { TileComponent } from './tile.component';

@Component({
    selector: 'row',
    template: `
    <div class="row">
        <tile *ngFor="let tile of tiles; let i = index" [x]="i" [y]="y"></tile>
    </div>
    `,
    styles: [`
    .row {
        margin: 0;
    }
`],
})
export class RowComponent implements OnInit {
    @Input() tiles;
    @Input() y = 1;

    constructor(){

    }

    ngOnInit(){
        // console.log(this.tiles);
    }
}