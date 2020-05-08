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
  filter,
  debounceTime,
  tap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { objectDelta } from '@dnd/utilities';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  adventurer = new Adventurer({});

  public synced = false;
  public loaded = false;

  public savedData = new BehaviorSubject<Partial<AdventurerData>>({});
  public currentData = new BehaviorSubject<Partial<AdventurerData>>({});

  readonly delta = combineLatest(this.savedData, this.currentData).pipe(
    map(([saved, current]) => objectDelta(saved, current)),
    distinctUntilChanged((a, b) => JSON.stringify(a) == JSON.stringify(b))
  );

  private destroyed = new Subject<void>();

  private socket = this.connectedService.socket;

  // newbie
  private id = '5eb5b9014a88e449c7cbcae8';

  // Kelryn
  // private id = '5eaf7d46e366b9c0a86767e6';

  // Dresdin
  // private id = '5eb17ae17bfc0652cbaca976';

  constructor(private connectedService: ConnectedService) {}

  ngOnInit(): void {
    this.connectedService.whenConnected
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        console.log(`Getting character...`);
        this.getCharacter(this.id);
      });

    this.delta
      .pipe(
        takeUntil(this.destroyed),
        filter((x) => Object.keys(x).length > 0),
        debounceTime(500)
        // tap((delta) => console.log('filtered detla', delta))
      )
      .subscribe((delta) => {
        // console.log('Change detected.. saving.');
        this.save(delta);
      });

    interval(200)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.currentData.next(this.adventurer.toJSON()));
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  claimSaved() {
    this.savedData.next(this.currentData.value);
    this.synced = true;
    console.log(`Saved`);
  }

  getCharacter(id: string) {
    this.socket.emit('get-character', id, (character: any) => {
      console.log(`Character recieved!`, character);
      this.adventurer = new Adventurer(character);
      this.loaded = true;
      this.claimSaved();
    });
  }

  save(delta) {
    this.synced = false;
    this.socket.emit(
      'update-character',
      {
        id: this.id,
        delta,
      },
      () => {
        this.claimSaved();
      }
    );
  }
}
