import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public model!: NgbDateStruct;
  public today = this.calendar.getToday();
  public todayDate: Date = new Date();

  constructor(
    private calendar: NgbCalendar,
    private shareData: ShareDataService,
  ) { }
  ngOnInit(): void {
  }

  checkSubscriptionStatus(): any {

    this.shareData.data = this.model;

  }

}
