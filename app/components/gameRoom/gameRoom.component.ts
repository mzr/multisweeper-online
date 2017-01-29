import { Component,OnInit,OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute,Router,Params } from '@angular/router';

@Component({
    selector: 'room',
    template: `
    <div class="container well">
        <div class="com-md-12"><h2>Room {{roomName}}</h2></div>
        <div class="col-md-6">
            <minesweeper></minesweeper>
        </div>
        <div class="col-md-6">
            <div>
                <h4>Lista graczy</h4>
                <ul>
                    <li *ngFor="let player of players">{{player.name}}</li>
                </ul>
            </div>
            <chat></chat>
            <nav>
                <button (click)="leaveRoom()" class="btn btn-default">Opuść pokój</button>
            </nav>
        </div>
    </div>
    `
})
export class GameRoomComponent implements OnInit{
    board;
    maxPlayers;
    players = [];
    roomName;

    constructor(private socketService: SocketService,private router: Router,private route: ActivatedRoute) { }

    ngOnInit(){
        this.roomName = this.route.params._value.name;
        this.getJoinResponse();
        this.getCreateResponse();
    }

    getCreateResponse(){
        this.socketService.getCreateResponse().subscribe(data => {
            this.board = data.board;
            this.maxPlayers = data.maxPlayers;
            this.players = data.players;
        })
    }

    getJoinResponse(){
        this.socketService.getJoinResponse().subscribe(data =>{
            console.log(data);
            this.players = data.players;
            this.maxPlayers = data.maxPlayers;
            this.board = data.board;
        })
    }

    leaveRoom(){
        this.socketService.leaveRoom();
        this.router.navigate(['/waitingroom']);
    }

}