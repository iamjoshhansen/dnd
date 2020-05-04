import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ConnectedService {
  private connectedSource = new BehaviorSubject<boolean>(false);
  readonly connected = this.connectedSource.pipe(distinctUntilChanged());

  readonly whenConnected = this.connected.pipe(
    filter((connected) => connected)
  );
  readonly whenDisconnected = this.connected.pipe(
    filter((connected) => !connected)
  );

  constructor(readonly socket: Socket) {
    socket.on('connect', () => {
      this.connectedSource.next(true);
    });
    socket.on('disconnect', () => {
      this.connectedSource.next(false);
    });
  }
}
