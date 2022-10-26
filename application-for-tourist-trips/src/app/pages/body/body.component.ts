import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database/database.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public AboutUsCheck: boolean = true;
  public countryCheck: boolean = false;
  public buyTicketCheck: boolean = false;
  public bookHotelCheck: boolean = false;

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit(): void {

  }



  sideMenuChange(): void {
    this.AboutUsCheck = false;
    this.countryCheck = false;
    this.buyTicketCheck = false;
    this.bookHotelCheck = false;
    console.log(this.buyTicketCheck);
  }

}
