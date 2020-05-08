import { Component, Input } from '@angular/core';
import { SpellDetailsResponse } from 'src/app/interfaces/spell-response.interface';

@Component({
  selector: 'app-spell-details',
  templateUrl: './spell-details.component.html',
  styleUrls: ['./spell-details.component.scss'],
})
export class SpellDetailsComponent {
  @Input() spell: SpellDetailsResponse;
}
