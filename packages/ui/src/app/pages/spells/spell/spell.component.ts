import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SpellResponse } from 'src/app/interfaces/spell-response.interface';
import { DndService } from 'src/app/dnd.service';
import { map, takeUntil, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss'],
})
export class SpellComponent implements OnInit, OnDestroy {
  private spellSubject = new BehaviorSubject<SpellResponse>(undefined);
  readonly spell = this.spellSubject.pipe(
    filter((x) => typeof x !== undefined)
  );

  private destroyed = new Subject<void>();

  constructor(
    private dndService: DndService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url
      .pipe(takeUntil(this.destroyed))
      .subscribe(async () => {
        const index = this.activatedRoute.snapshot.params.index;
        this.dndService.getSpell(index).subscribe((spell) => {
          this.spellSubject.next(spell);
        });
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
