import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';


// loginService

@Component({
    templateUrl: 'components/login/login.component.html',
    providers : []
})
export class LoginComponent  {
    private userName : string;

    constructor(private socketService: SocketService, private router: Router) {
        this.connect(); 
    }

    connect(){
        this.socketService.connect();
    }

    login(){
        this.socketService.login(this.userName);
        this.loginResponse();
        this.router.navigate(['/waitingroom']);
    }

    loginResponse(){
        this.socketService.getLoginResponse().subscribe(data => {
            console.log(data); // data to obiekt {ok: true / false}
        })
    }
}
