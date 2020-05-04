import { Component } from '@angular/core';
import { ConnectedService } from './services/connected/connected.service';
import { ThemeService, Theme } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  connected = this.connectedService.connected;

  constructor(
    private connectedService: ConnectedService,
    private theme: ThemeService
  ) {}

  toggleTheme() {
    if (this.theme.current == Theme.light) {
      this.theme.setTheme(Theme.dark);
    } else {
      this.theme.setTheme(Theme.light);
    }
  }
}
