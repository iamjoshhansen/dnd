import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, filter } from 'rxjs/operators';
import { SpellsService } from 'src/app/services/spells/spells.service';
import { SpellListItemResponse } from 'src/app/interfaces/spell-response.interface';

interface SpellsResult {
  index: string;
  name: string;
  url: string;
}

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit {
  private searchSubject = new BehaviorSubject<string>('');
  readonly searchObserver = this.searchSubject.pipe(distinctUntilChanged());
  @Input() set search(val: string) {
    this.searchSubject.next(val);
  }
  get search() {
    return this.searchSubject.value;
  }

  private selectedSubject = new BehaviorSubject<string>('');
  readonly selected = this.selectedSubject.pipe(distinctUntilChanged());
  readonly selectedSpell = this.selected.pipe(
    filter((index) => !!index),
    switchMap((spellIndex) => this.spellsService.getSpell(spellIndex))
  );

  private resultsSubject = new BehaviorSubject<SpellListItemResponse[]>([]);
  readonly results = this.resultsSubject.asObservable();

  readonly filteredResults = combineLatest(
    this.searchObserver,
    this.results
  ).pipe(
    // map(([search, results]: [string, SpellListItemResponse[]]) => {
    //   if (search.length === 0) {
    //     return results;
    //   }
    //   return [
    //     search,
    //     results.filter((result) => {
    //       return result.classes.includes('Wizard');
    //     }),
    //   ];
    // }),
    map(([search, results]: [string, SpellListItemResponse[]]) => {
      if (search.length === 0) {
        return results;
      }

      const lowerSearch = search.toLowerCase();

      return results.filter((result) => {
        return result.name.toLowerCase().indexOf(lowerSearch) > 0 - 1;
      });
    })
  );

  readonly levelGroups: Observable<
    { level: number; spells: SpellListItemResponse[] }[]
  > = this.filteredResults.pipe(
    map((allSpells) => {
      const levels: Record<number, SpellListItemResponse[]> = {};

      allSpells.forEach((spell) => {
        const level = spell.level;
        if (!(level in levels)) {
          levels[level] = [];
        }
        levels[level].push(spell);
      });

      const groups = [];
      Object.keys(levels).forEach((level) => {
        const spells = levels[level];
        groups.push({
          level,
          spells,
        });
      });

      return groups;
    })
  );

  constructor(private spellsService: SpellsService) {}

  ngOnInit() {
    this.spellsService.getSpells().subscribe((spells) => {
      this.resultsSubject.next(spells);
    });
  }

  select(index: string) {
    this.selectedSubject.next(index);
  }
}
