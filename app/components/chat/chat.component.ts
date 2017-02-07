import { Component, OnInit,AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'chat',
    templateUrl: 'components/chat/chat.component.html',
    styles : [`
    #messages { list-style-type: none; margin: 0; padding: 0; overflow-y:scroll; max-height: 300px; }
    #messages li { padding: 5px 10px; } 
    #messages li::after { content:""; height:1px; display:block; background-color:#00bc8c;}`]
})
export class ChatComponent implements OnInit, AfterViewChecked { 
    messages = [];
    connection;
    message;

    @ViewChild('scroll') private myScrollContainer: ElementRef;

    constructor(private socketService : SocketService) { }

    ngOnInit(){
        this.getMessages();
    }

    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    getMessages(){
        this.socketService.getMessages().subscribe(message=>{
            this.messages.push(message);
        })
    }

    sendMessage(){
        if(this.message){
            this.socketService.sendMessage(this.message);
            this.message="";
        }
    }

    scrollToBottom(){
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }
}
