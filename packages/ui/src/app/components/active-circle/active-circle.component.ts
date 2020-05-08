import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-circle',
  templateUrl: './active-circle.component.html',
  styleUrls: ['./active-circle.component.scss'],
})
export class ActiveCircleComponent {
  @Input() active = false;
}
