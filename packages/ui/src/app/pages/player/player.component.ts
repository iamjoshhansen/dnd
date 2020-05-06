import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Adventurer,
  AdventurerData,
} from 'src/app/components/character-sheet/adventurer';
import { Subject, BehaviorSubject, interval, combineLatest } from 'rxjs';
import { ConnectedService } from 'src/app/services/connected/connected.service';
import {
  takeUntil,
  map,
  distinctUntilChanged,
  filter,
  debounceTime,
} from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  adventurer = new Adventurer({});

  public savedData = new BehaviorSubject<Partial<AdventurerData>>({});
  public currentData = new BehaviorSubject<Partial<AdventurerData>>({});

  public changedDetected = combineLatest(this.savedData, this.currentData).pipe(
    map(
      ([saved, current]) => JSON.stringify(saved) !== JSON.stringify(current)
    ),
    distinctUntilChanged()
  );

  private destroyed = new Subject<void>();

  private socket = this.connectedService.socket;

  private id = '5eaf7d46e366b9c0a86767e6';
  // private id = '5eb17ae17bfc0652cbaca976';

  constructor(private connectedService: ConnectedService) {}

  ngOnInit(): void {
    this.connectedService.whenConnected
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        console.log(`Getting character...`);
        this.getCharacter(this.id);
      });

    this.changedDetected
      .pipe(
        takeUntil(this.destroyed),
        debounceTime(250),
        filter((x) => x)
      )
      .subscribe(() => {
        console.log('Change detected.. saving.');
        this.save();
      });

    interval(200)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        // const savedJSON = JSON.stringify(this.savedData);
        // const currentJSON = JSON.stringify(this.adventurer);
        // if (savedJSON !== currentJSON) {

        // }
        this.currentData.next(this.adventurer.toJSON());
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  claimSaved() {
    this.savedData.next(this.adventurer.toJSON());
  }

  getCharacter(id: string) {
    this.socket.emit('get-character', id, (character: any) => {
      console.log(`Character recieved!`, character);
      this.adventurer = new Adventurer(character);
      this.claimSaved();
    });
  }

  save() {
    this.socket.emit(
      'save-character',
      {
        id: this.id,
        data: this.adventurer.toJSON(),
      },
      () => {
        this.savedData.next(this.currentData.value);
        console.log(`Saved`);
      }
    );
  }
}
