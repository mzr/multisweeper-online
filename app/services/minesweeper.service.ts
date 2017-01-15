import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class MinesweeperService {
    
    private url = 'http://localhost:3000';
    private socket : any;

    // podłączenie nowego usera do pokoju

    roomConnected(room){
        console.log('emit "new-user-connected" to room: ' + room);
        this.socket.emit('new-user-connected',room);
    }

    getRoomConnected(){
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('new-user-connected-response', game => {
                observer.next(game);
            });
        return () => {
            this.socket.disconnect();
        }
        })
    return observable;
    }

    // utworzenie nowego pokoju

    roomCreated(settings){
        console.log('emit "new-room-created" with settings: ' + settings);
        this.socket.emit('new-room-created',settings);
    }

    getRoomCreated(){

    }

    // odłączneie od pokoju

    roomDisconnected(sth = {user: user, room: room}){
        console.log('emit "user-disconnected" : ' + sth);
        this.socket.emit('user-disconnected',sth);
    }

    getRoomDisconnected(){

    }

    // klikniecie pola

    tileClicked(tile){
        console.log('emit "user-clicked" : ' + tile);
        this.socket.emit('user-clicked',tile);
    }

    getTileClicked(){

    }

    // jakieś sygnały na wygranie gry i przegranie.


}