import { Component,OnInit,OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute,Router,Params } from '@angular/router';

@Component({
    selector: 'room',
    templateUrl: 'components/gameRoom/gameRoom.component.html'
})
export class GameRoomComponent implements OnInit{
    board = [[-1,-1],[-1,-1]];
    maxPlayers;
    players = [];
    roomName;

    //players to raz lista obiektow a raz lista stringow

    constructor(private socketService: SocketService,private router: Router,private route: ActivatedRoute) { }

    ngOnInit(){
        this.roomName = this.route.params._value.name;
        this.getJoinResponse();
        this.getCreateResponse();
        this.getRoomUsersUpdated();
        this.getBoardUpdated();
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