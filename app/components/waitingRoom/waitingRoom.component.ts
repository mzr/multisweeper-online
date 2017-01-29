import { Component,OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'waitingRoom',
    templateUrl: 'components/waitingRoom/waitingRoom.component.html',
    styles: ['.rooms > li:hover{background: gray;}']
})
export class WaitingRoomComponent implements OnInit {
    waitingUsers = [];
    rooms = [];

    height: number;
    width: number;
    name: string;
    bombs: number;
    players: number;


    constructor( private socketService: SocketService, private router: Router) { }

    ngOnInit(){
        this.getRoomUsersUpdated();
        this.getListRooms();
        this.getRoomsUpdated();

        this.socketService.listRooms();
    }

    getRoomUsersUpdated(){
        this.socketService.getRoomUsersUpdated().subscribe(data => {
            this.waitingUsers = data.users;
        })
    }   

    createRoom(){
        var settings = {
            name: this.name,
            height: this.height,
            width: this.width,
            bombs: this.bombs,
            maxPlayers: this.players
        }
        this.socketService.createRoom(settings);
        this.router.navigate(['/gameroom',this.name]);
    }

    getRoomsUpdated(){
        this.socketService.getRoomsUpdated().subscribe(data => {
            this.rooms = data.rooms;
            this.rooms.splice(0,1);
        })
    }

    getListRooms(){
        this.socketService.getListRooms().subscribe(data =>{
            this.rooms = data.rooms;
            this.rooms.splice(0,1);
        })
    }

    joinRoom(room){
        // console.log('joining room');
        this.socketService.joinRoom(room.name);
        this.router.navigate(['/gameroom',room.name]);
    }
    

}