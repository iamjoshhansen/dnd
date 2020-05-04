import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifier',
})
export class ModifierPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return '0';
    }
    return `${value > 0 ? '+' : '-'}${Math.abs(value)}`;
  }
}
