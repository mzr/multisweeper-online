import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    
    public url = 'http://localhost:3000';
    private socket : any;

    connect(){
        this.socket = io(this.url);
        console.log('connected to WS');
    }

    login(username: string){
        this.socket.emit('login',username);
    }

    getLoginResponse() {
        let observable = new Observable(observer => {
            this.socket.on('login-response', (data) => {
                observer.next(data);    
            });
            /*return () => {
                this.socket.disconnect();
            };  */
        })     
        return observable;
    }  

}