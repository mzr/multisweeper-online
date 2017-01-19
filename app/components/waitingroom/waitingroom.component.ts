import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'waitingroom',
    template: `
    <div>
        <h2>Poczekalnia</h2>
        <div class="container well">
            <div class="col-md-4">
                <h3>Lista pokoi</h3>
                <ul> 
                    <li>Room 1</li>
                    <li>Room 2</li>
                    <li>Room 3</li>
                </ul>
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
    providers: [ SocketService ]
})
export class WaitingroomComponent {

    // private rooms;

    constructor( private socketService : SocketService){
        socketService.connect();

        // rooms = socketService.getRooms();
    }



}