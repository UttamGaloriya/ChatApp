import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';


@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(date: Timestamp | undefined): string {
    return this.datePipe.transform(date?.toMillis(), 'shortDate') ?? '';
  }

}
