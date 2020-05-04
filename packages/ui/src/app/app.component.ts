import { Component } from '@angular/core';
import { ConnectedService } from './services/connected/connected.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  connected = this.connectedService.connected;

  constructor(private connectedService: ConnectedService) {}
}
