import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  myDateChanged: EventEmitter<any> = new EventEmitter();

  myDate: any;

  constructor() { }

  get data(): any {
    return this.myDate;
  }

  set data(val: any) {
    this.myDate = val;
    this.myDateChanged.emit(val);
  }
}
