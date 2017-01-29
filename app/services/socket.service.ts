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
    private socket : any;
    private userName: string;

    canActivate(route ,state){
        if(state.url !== '/login' && !this.userName ){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    connect(){
        if(!this.socket){
            // this.socket = io(this.url);
            this.socket = io('https://multisweeper-online.herokuapp.com');
            // console.log('connected to WS');
        }
    }

    login(username: string){
        if(!this.userName){
            this.socket.emit('login',username);
            this.userName = username;
            // console.log(`logged with username ${this.userName}`);
        }  
    }

    getLoginResponse() {
        let observable = new Observable(observer => {
            this.socket.on('login-response', (data) => {
                observer.next(data);    
            });
        })     
        return observable;
    }

    getRoomUsersUpdated(){
       let observable = new Observable(observer => {
            this.socket.on('room-users-updated', data => {
                observer.next(data);
            });
        })
        return observable; 
    }

    createRoom(settings){
        this.socket.emit('create',settings);
    }

    getRoomsUpdated(){
        let observable = new Observable(observer => {
            this.socket.on('rooms-updated', data => {
                observer.next(data);
            });
        })
        return observable; 
    }

    getCreateResponse(){
        let observable = new Observable(observer => {
            this.socket.on('create-response', data => {
                observer.next(data);
            });
        })
        return observable;
    }


    listRooms(){
        this.socket.emit('list-rooms');
    }

    getListRooms(){
       let observable = new Observable(observer => {
            this.socket.on('list-rooms-response', data => {
                observer.next(data);
            });
        })
        return observable; 
    }

    joinRoom(name:string){
        this.socket.emit('join',name);
    }

    getJoinResponse(){
        let observable = new Observable(observer => {
            this.socket.on('join-response', data => {
                observer.next(data);
            });
        })
        return observable;
    }

    leaveRoom(){
        this.socket.emit('leave');
    }



}