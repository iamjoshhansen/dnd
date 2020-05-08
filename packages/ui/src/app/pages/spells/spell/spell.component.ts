import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SpellDetailsResponse } from 'src/app/interfaces/spell-response.interface';
import { takeUntil, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SpellsService } from 'src/app/services/spells/spells.service';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss'],
})
export class SpellComponent implements OnInit, OnDestroy {
  private spellSubject = new BehaviorSubject<SpellDetailsResponse>(undefined);
  readonly spell = this.spellSubject.pipe(
    filter((x) => typeof x !== undefined)
  );

  private destroyed = new Subject<void>();

  constructor(
    private spellsService: SpellsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url
      .pipe(takeUntil(this.destroyed))
      .subscribe(async () => {
        const index = this.activatedRoute.snapshot.params.index;
        this.spellsService.getSpell(index).subscribe((spell) => {
          this.spellSubject.next(spell);
        });
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
