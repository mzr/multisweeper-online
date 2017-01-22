import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';

// loginService

@Component({
    templateUrl: 'components/login/login.component.html'
})
export class LoginComponent  {
    private userName : string;

    constructor(private socketService: SocketService) {
        this.connect(); // za każdym wejściem na komponent login łączy się jeszcze raz - to źle
    }

    connect(){
        this.socketService.connect();
    }

    login(){
        this.socketService.login(this.userName);
        this.loginResponse();
    }

    loginResponse(){
        this.socketService.getLoginResponse().subscribe(data => {
            console.log(data); // data to obiekt {ok: true / false}
        })
    }
}
