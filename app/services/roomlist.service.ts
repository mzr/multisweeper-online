import { Injectable } from '@angular/core';

import { Room } from '../components/room/room.component';
import { roomList } from '../mocks/roomListMock';

@Injectable()
export class RoomListService {
  getRoomList(): Promise<Room[]> {
    return Promise.resolve(roomList);
  }
}