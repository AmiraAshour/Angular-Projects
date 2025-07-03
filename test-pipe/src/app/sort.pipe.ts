import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false, // Default is true, but can be set to false if you want the pipe to be impure
})
export class SortPipe implements PipeTransform {

  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    let sorted = [...value];
    sorted.sort((a, b) => {
      if (a < b) {
        return direction === 'asc' ? -1 : 1;
      } else
        return direction === 'asc' ? 1 : -1;
    });
    return sorted;
  }

}
