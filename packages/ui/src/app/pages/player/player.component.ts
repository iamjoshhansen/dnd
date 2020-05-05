import { Component, OnInit, OnDestroy } from '@angular/core';
import { Adventurer } from 'src/app/components/character-sheet/adventurer';
import { Subject } from 'rxjs';
import { ConnectedService } from 'src/app/services/connected/connected.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  adventurer = new Adventurer({});

  private destroyed = new Subject<void>();

  private socket = this.connectedService.socket;

  constructor(private connectedService: ConnectedService) {}

  ngOnInit(): void {
    this.connectedService.whenConnected
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        console.log(`Getting character...`);
        this.getCharacter('5eaf7d46e366b9c0a86767e6');
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  getCharacter(id: string) {
    this.socket.emit('get-character', id, (character: any) => {
      console.log(`Character recieved!`, character);
      this.adventurer = new Adventurer(character);
    });
  }
}
