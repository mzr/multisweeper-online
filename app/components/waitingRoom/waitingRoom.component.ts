import { Component,OnInit,OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
    selector: 'waitingRoom',
    templateUrl: 'components/waitingRoom/waitingRoom.component.html',
    styles: ['.rooms > li:hover{background: gray;}']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
    waitingUsers = [];
    rooms = [];

    height: number;
    width: number;
    name: string;
    bombs: number;
    players: number;


    constructor( private socketService: SocketService, private router: Router) {
     }

    ngOnInit(){
        this.getRoomUsersUpdated();
        this.getListRooms();
        this.getRoomsUpdated();

        this.listRooms();  
    }

    listRooms(){
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
        if( !this.name || ! this.height || !this.width || !this.players || !this.bombs) { alert('ustaw wszystkie pola'); return; }
        if(this.height <2 || this.height > 10 ){ alert('wysokość musi być >= 2 i <=10'); return; }
        if(this.width < 2 || this.width > 10 ){ alert('szerokosc musi byc >= 2 i <=10'); return; }
        if(this.players<1 || this.players > 10 ){ alert('ilosc graczy musi byc >= 1 i <=10'); return; }
        if(this.bombs < 1 || this.bombs > 99 ){ alert('bomby >= 1 i <= 99'); return; }
        
        this.socketService.createRoom(settings);
        this.router.navigate(['/gameroom',this.name]);
    }

    getRoomsUpdated(){
        this.socketService.getRoomsUpdated().subscribe(data => {
            console.log('getRoomsUpdated C ' + JSON.stringify(data));
            this.rooms = data.rooms;
        })
    }

    getListRooms(){
        this.socketService.getListRooms().subscribe(data =>{
            console.log('getListRooms C ' + JSON.stringify(data));
            this.rooms = data.rooms;
        })
    }

    joinRoom(room){
        if(room.maxPlayers - room.players >= 1 ){
            console.log('joining room');
            this.socketService.joinRoom(room.name);
            this.router.navigate(['/gameroom',room.name]);
        }
    }

    ngOnDestroy(){
        this.rooms = [];
    }
    

}