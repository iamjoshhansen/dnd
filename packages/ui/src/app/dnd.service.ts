import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpellDetailsResponse } from './interfaces/spell-response.interface';

const api = `http://www.dnd5eapi.co/api`;

@Injectable({
  providedIn: 'root',
})
export class DndService {
  constructor(private http: HttpClient) {}

  getSpells() {
    return this.http.get<{
      count: number;
      results: {
        index: string;
        name: string;
        url: string;
      }[];
    }>(`${api}/spells/`);
  }

  getSpell(index: string) {
    return this.http.get<SpellDetailsResponse>(`${api}/spells/${index}`);
  }
}
