import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {CanActivate} from '@angular/router/index';

import { Router } from '@angular/router';

@Injectable()
export class SocketService implements CanActivate {
    
    constructor(private router:Router){}

    // public url = 'http://localhost:3000';
    public url = 'https://multisweeper-online.herokuapp.com';
    private socket : any;
    private userName: string;

    connect(){
        if(!this.socket){
        this.socket = io(this.url);
        console.log('connected to WS');
        }
    }

    login(username: string){
        this.socket.emit('login',username);
        this.userName = username;
    }

    getLoginResponse() {
        let observable = new Observable(observer => {
            this.socket.on('login-response', (data) => {
                observer.next(data);    
            });
        })     
        return observable;
    }  

    canActivate(route ,state){
        if(state.url !== '/login' && !this.userName ){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}