import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {CanActivate} from '@angular/router/index';

import { Router } from '@angular/router';

@Injectable()
export class SocketService implements CanActivate {
    
    constructor(private router:Router){}
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
            console.log('s');
            console.log('s');
            console.log('s');
            this.socket = io('https://multisweeper-online.herokuapp.com');
        }
    }

    login(username: string){
        if(!this.userName){
            this.socket.emit('login',username);
            this.userName = username;
            console.log(`logged with username ${this.userName}`);
        }  
    }

    getLoginResponse() {
        let observable = new Observable(observer => {
            this.socket.on('login-response', (data) => {
                observer.next(data);
                console.log('getLoginResponse: ' + JSON.stringify(data)); 
            });
        })     
        return observable;
    }

    getRoomUsersUpdated(){
       let observable = new Observable(observer => {
            this.socket.on('room-users-updated', data => {
                observer.next(data);
                console.log('getRoomUsersUpdated: ' + JSON.stringify(data));
            });
        })
        return observable; 
    }

    createRoom(settings){
        console.log('joining created room');
        this.socket.emit('create',settings);
    }

    getRoomsUpdated(){
        let observable = new Observable(observer => {
            this.socket.on('rooms-updated', data => {
                observer.next(data);
                console.log('getRoomsUpdated: ' + JSON.stringify(data));
            });
        })
        return observable; 
    }

    getCreateResponse(){
        let observable = new Observable(observer => {
            this.socket.on('create-response', data => {
                observer.next(data);
                console.log('getCreateResponse: ' + JSON.stringify(data));
            });
        })
        return observable;
    }


    listRooms(){
        this.socket.emit('list-rooms');
        console.log('list rooms emited');
    }

    getListRooms(){
       let observable = new Observable(observer => {
            this.socket.on('list-rooms-response', data => {
                observer.next(data);
                console.log('getListRooms: ' + JSON.stringify(data));
            });
        })
        return observable; 
    }

    joinRoom(name:string){
        console.log('joining room');
        this.socket.emit('join',name);
    }

    getJoinResponse(){
        let observable = new Observable(observer => {
            this.socket.on('join-response', data => {
                observer.next(data);
                console.log('getJoinResponse: ' + JSON.stringify(data));
            });
        })
        return observable;
    }

    leaveRoom(){
        console.log('leaving room');
        this.socket.emit('leave');
    }

    sendMessage(message){
        console.log('emited message: ' + message);
        this.socket.emit('add-message',message);
    }

    click (x, y){
        console.log('clicked on '+ x + y);
        this.socket.emit('click', x, y)
    }

    getMessages(){
        let observable = new Observable(observer =>{
            this.socket.on('message',data =>{
                observer.next(data);
                console.log('got message '+ JSON.stringify(data));
            })
        })
        return observable;
    }

}