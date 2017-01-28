import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Room } from '../room/room.component';
import { OnInit } from '@angular/core';
import { RoomListService } from '../../services/roomlist.service'




@Component({
    selector: 'waitingroom',
    template: `
    <div>
        <h2>Poczekalnia</h2>
        <div class="container well">
            <div class="col-md-4">
                <h3>Lista pokoi</h3>
                    <table class="rooms">
                    <tr>
                        <td> Name </td>
                        <td> Players </td>
                    </tr>
                    <tr *ngFor = "let room of rooms" (click)="onSelect(room)">
                    <td> {{room.name}} </td>
                    <td align=center> {{room.players.length}} </td>
                    </tr>
                    </table>
            </div>
            <form class="col-md-8">
                <h3>Utwórz nowy pokój</h3>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Nazwa pokoju">
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" placeholder="szerekość planszy">
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" placeholder="wysokość planszy">
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" placeholder="ilość bomb">
                </div>
                <button type="Utwórz pokój" class="btn btn-default">Graj</button>
            </form>
        </div>
    </div>
    `,
    providers: [RoomListService]
})

export class WaitingroomComponent {
    rooms : Room[];

    getRoomList(): void {
        this.roomListSevice.getRoomList().then(rooms => this.rooms = rooms);
    }

    ngOnInit(): void {
        this.getRoomList();
    }

    constructor(private roomListSevice: RoomListService) { }
    
}