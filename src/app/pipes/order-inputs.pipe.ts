import { Pipe, PipeTransform } from '@angular/core';
import { InputOutputModel } from '../models/input-output.model';

@Pipe({
  name: 'orderInputs'
})
export class OrderInputsPipe implements PipeTransform {

  transform(items: InputOutputModel[]): InputOutputModel[] {
    return items.slice().sort((a, b) => {
      if (a.type === 'input') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
