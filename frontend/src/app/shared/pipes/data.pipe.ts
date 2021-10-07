import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dataPipe',
})

export class DataPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        var datePipe = new DatePipe("pt-BR");
        return datePipe.transform(value, 'dd/MM/yyyy hh:mm:ss');
      }
}