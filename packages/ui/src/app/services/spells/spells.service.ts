import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SpellDetailsResponse,
  SpellListItemResponse,
} from 'src/app/interfaces/spell-response.interface';

const api = `http://${window.location.hostname}:4143`;
console.log(`api:`, api);

@Injectable({
  providedIn: 'root',
})
export class SpellsService {
  constructor(private http: HttpClient) {}

  getSpells() {
    return this.http.get<SpellListItemResponse[]>(`${api}/spells/`);
  }

  getSpell(index: string) {
    return this.http.get<SpellDetailsResponse>(`${api}/spell-detail/${index}`);
  }
}
