import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

const xpLevelValues = [
  0,
  300,
  900,
  2700,
  6500,
  14000,
  23000,
  34000,
  48000,
  64000,
  85000,
  100000,
  120000,
  140000,
  165000,
  195000,
  225000,
  265000,
  305000,
  355000,
];

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  private xpSubject = new BehaviorSubject<number>(0);
  readonly xpObserver = this.xpSubject.pipe(distinctUntilChanged());
  get xp() {
    return this.xpSubject.value;
  }
  set xp(val: number) {
    this.xpSubject.next(val);
  }
  readonly levelObserver = this.xpObserver.pipe(
    map((xp) => {
      let level = 0;

      while (xp >= xpLevelValues[++level]) {}

      return level;
    }),
    distinctUntilChanged(),
  );
  readonly levelExplanationObserver = combineLatest(this.xpObserver, this.levelObserver).pipe(
    map(([xp, level]) => {
      if (level === 20) {
        return `You maxed out at level 20 with ${xpLevelValues[xpLevelValues.length - 1]}xp!`;
      }

      const nextXp = xpLevelValues[level];
      const delta = nextXp - xp;

      return `You will get to level ${level + 1} when you have ${nextXp}xp.\nOnly ${delta} more to go!`;
    }),
  );

  constructor() {}

  ngOnInit(): void {}
}
