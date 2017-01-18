import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    
    public url = 'http://localhost:3000';
    public socket : any;

    connect(){
        this.socket = io(this.url);
        console.log('connected to WS');
    }


   /* getRooms(){
        let observable = new Observable(observer => {
            this.socket.on('new-room-added', room => {
                observer.next(room);
            });
        })
        return observable;
    }*/


}