import { Component,Input,OnInit } from '@angular/core';
import { TileComponent } from './tile.component';

@Component({
    selector: 'row',
    template: `
    <div class="row">
        <tile *ngFor="let tile of tiles"></tile>
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

    constructor(){

    }

    ngOnInit(){
        // console.log(this.tiles);
    }
}