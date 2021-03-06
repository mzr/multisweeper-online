import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: 'components/login/login.component.html',
    styleUrls: ['components/login/login.component.css']
})
export class LoginComponent implements OnInit {
    private userName : string;

    constructor(private socketService: SocketService, private router: Router) {
        
    }

    ngOnInit(){
        this.socketService.connect();
        this.getLoginResponse();
    }

    login(){
        if(!this.userName){
            alert('podaj username');
            return;
        }

        this.socketService.login(this.userName);     
        this.router.navigate(['/waitingroom']);
    }

    getLoginResponse(){
        this.socketService.getLoginResponse().subscribe(data => {
            // console.log('login response: ' + JSON.stringify(data));
        })
    }

    


    
}
