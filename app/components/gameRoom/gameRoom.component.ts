import { Component,OnInit,OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute,Router,Params } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'room',
    templateUrl: 'components/gameRoom/gameRoom.component.html',
    styles: 
    [`.state {
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        }
    `]
})
export class GameRoomComponent implements OnInit{
    board = [[-1,-1],[-1,-1]];
    maxPlayers;
    players = [];
    state = 'starting';
    roomName;

    //players to raz lista obiektow a raz lista stringow

    constructor(
        private socketService: SocketService,
        private router: Router,
        private route: ActivatedRoute, 
        private location: PlatformLocation) 
    { }

    ngOnInit(){
        this.roomName = this.route.params._value.name;
        this.getJoinResponse();
        this.getCreateResponse();
        this.getRoomUsersUpdated();
        this.getBoardUpdated();
      
        this.location.onPopState(() => {
            this.leaveRoom();
        })
// emiting leaveRoom upon going back in browser
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
            // console.log(data);
            this.players = data.players;
            this.maxPlayers = data.maxPlayers;
            this.board = data.board;
        })
    }

   getBoardUpdated(){
        this.socketService.getBoardUpdated().subscribe(data =>{
             console.log(data);
            this.board = data.board;
            this.state = data.state;
            if(data.state == 'lose')
                this.board[data.loserI][data.loserJ]=-3
        })
    }

    getRoomUsersUpdated(){
        this.socketService.getRoomUsersUpdated().subscribe(data =>{
            this.players = data.users;
        })
    }

    leaveRoom(){
        this.socketService.leaveRoom();
        this.router.navigate(['/waitingroom']);
    }


}