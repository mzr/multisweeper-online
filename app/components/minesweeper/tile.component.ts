import { Component,Input,OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'tile',
    template: `
    <div [ngClass]="{clicked: (this.val>-1), tile: (this.val==-1), flag: (this.val==-2), bomb: (this.val==-3)}"
     (click)="onClick()" (contextmenu)="onFlag($event)" >{{val}}</div>
    `,
    styles: [`
    .tile {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 0;
        background-color: gray;
        border: 1px solid white;
        float: left;
    }
    .clicked {        
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #ffcc66;
        border: 1px solid white;
        float: left;
    }
    .bomb {        
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 0;
        background-color: red;
        border: 1px solid white;
        float: left;
    }
    .flag {        
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 0;
        background-color: #0066cc;
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
//    isClicked: bool; fix: wraca do wartości false
    // constructor(x, y){
    //     this.x=x;
    //     this.y=y;
    //
    constructor(private socketService: SocketService) { }

    onClick() {
        console.log(this.x);
        console.log(this.y);
        this.socketService.click( {i: this.y,
        j:  this.x} );
//        this.isClicked = true;
    }
    onFlag() {
        console.log("flag!!");
        this.socketService.flag( {i: this.y,
        j:  this.x} );
        return false;
    }
    
}