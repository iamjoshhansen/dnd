import { Component, OnInit, Input } from '@angular/core';
import { DndService } from '../../dnd.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

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

  private resultsSubject = new BehaviorSubject<SpellsResult[]>([]);
  readonly results = this.resultsSubject.asObservable();

  readonly filteredResults = combineLatest(
    this.searchObserver,
    this.results
  ).pipe(
    map(([search, results]: [string, SpellsResult[]]) => {
      if (search.length === 0) {
        return results;
      }

      const lowerSearch = search.toLowerCase();

      return results.filter((result) => {
        return result.name.toLowerCase().indexOf(lowerSearch) > 0 - 1;
      });
    })
  );

  constructor(private dndService: DndService) {}

  ngOnInit() {
    this.dndService.getSpells().subscribe((spells) => {
      this.resultsSubject.next(spells.results);
    });
  }
}
