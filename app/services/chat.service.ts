import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
    
    private url = 'http://localhost:3000';
    private socket : any;

    sendMessage(message){
        console.log('emited message: ' + message);
        this.socket.emit('add-message',message);
    }

    getMessages(){
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message',data =>{
                observer.next(data);
            });
        return () =>{
            this.socket.disconnect();
        }
        })
    return observable;
    }

}