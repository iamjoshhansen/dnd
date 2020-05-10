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
  skipWhile,
} from 'rxjs/operators';
import { objectDelta, type } from '@dnd/utilities';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  public adventurer = new Adventurer({});

  public loaded = false;
  public saving = false;

  private lastDeltaString: string;
  public savedData: Partial<AdventurerData> = {};
  get delta() {
    const localDelta = objectDelta(this.savedData, this.adventurer.toJSON());

    const localDeltaString = JSON.stringify(localDelta);
    if (localDeltaString !== this.lastDeltaString) {
      this.lastChangeDate = new Date();
    }
    this.lastDeltaString = localDeltaString;
    return localDelta;
  }

  get hasDelta() {
    return Object.keys(this.delta).length > 0;
  }

  private lastChangeDate = new Date();

  get lastChangeIsOldEnough() {
    return this.timeSinceLastChange > 1000;
  }

  get timeSinceLastChange() {
    return new Date().getTime() - this.lastChangeDate.getTime();
  }

  get canSaveNow() {
    return (
      this.loaded && !this.saving && this.hasDelta && this.lastChangeIsOldEnough
    );
  }

  get willSaveSoon() {
    return (
      this.loaded &&
      !this.saving &&
      this.hasDelta &&
      !this.lastChangeIsOldEnough
    );
  }

  get state(): string {
    if (!this.loaded) {
      return 'loading';
    }

    if (this.saving) {
      return 'saving';
    }

    if (this.willSaveSoon) {
      return 'waiting';
    }

    return 'synced';
  }

  private destroyed = new Subject<void>();
  private socket = this.connectedService.socket;

  // Beatle!
  // private id = '5eb5b9014a88e449c7cbcae8';

  // Kelryn
  private id = '5eaf7d46e366b9c0a86767e6';

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

    interval(500)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        if (this.canSaveNow) {
          this.save(this.delta);
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  getCharacter(id: string) {
    this.socket.emit('get-character', id, (character: any) => {
      console.log(`Character recieved!`, character);
      this.adventurer = new Adventurer(character);
      this.savedData = this.adventurer.toJSON();
      this.loaded = true;
    });
  }

  save(delta) {
    this.saving = true;
    this.savedData = this.adventurer.toJSON();
    this.socket.emit(
      'update-character',
      {
        id: this.id,
        delta,
      },
      () => {
        console.log(`Saved. Data updated`);
        this.saving = false;
      }
    );
  }
}
