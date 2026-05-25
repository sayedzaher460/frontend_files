import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject: any[], searchTerm: string): any[] {

    return arrayOfObject.filter((item) => item.name.includes(searchTerm) );
  
  }
  }


