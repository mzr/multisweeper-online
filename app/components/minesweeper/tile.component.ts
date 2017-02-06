import { Component,Input,OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'tile',
    template: `
    <div class="tile" (click)="write()" >{{val}}</div>
    `,
    styles: [`
    .tile {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: gray;
        border: 1px solid white;
        float: left;
    }
    .tile:active {
        background-color: dimgray;
    }
`],
})
export class TileComponent {
    @Input() x : int = 0;
    @Input() y : int = 0;
    @Input() val: int = 0;
    // constructor(x, y){
    //     this.x=x;
    //     this.y=y;
    //
    constructor(private socketService: SocketService) { }

    write () {
        console.log(this.x);
        console.log(this.y);
        this.socketService.click( {i: this.y,
        j:  this.x} );
    }
    
}