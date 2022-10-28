import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ICountries } from 'src/app/shared/interfaces/countries/countries.interface';
import { IHotel } from 'src/app/shared/interfaces/hotels/hotels.interface';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public countries: Array<ICountries> = [];
  public selectedCountries: Array<string> = [];
  public newCountries: Array<string> = [];

  public selectedHotels: Array<IHotel> = [];
  public selectedTickets: Array<IHotel> = [];

  public AboutUsCheck: boolean = true;
  public countryCheck: boolean = false;
  public buyTicketCheck: boolean = false;
  public bookHotelCheck: boolean = false;

  constructor(
    private database: DatabaseService,
    private shareData: ShareDataService,
  ) {
    shareData.myDateChanged.subscribe(status => this.updatedStatus(status));
  }

  ngOnInit(): void {
    this.getCountries();
    this.dateGenerator()
  }

  // clientDate(): void {
  // }

  updatedStatus(status: any): void {
    console.log('it`s works!!!', status);

  }


  dateGenerator(): void {
    let date = new Date;
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    console.log(`today is: ${dd}.${mm}.${yyyy}`);

  }

  selectedHotelCheck(form: NgForm): void {
    console.log(form.value);
  }


  selectedCountriesCheck(form: NgForm): void {
    this.newCountries = [];
    this.selectedCountries = [];

    for (let key in form.value) {
      this.selectedCountries.push(key)
    }

    let newSelectedC = this.selectedCountries;
    let keyValue = (i: number) => form.control.controls[`${this.selectedCountries[(i)]}`].value;

    for (let i = 0; i < newSelectedC.length; i++) {
      if (keyValue(i)) {
        this.newCountries.push(this.selectedCountries[i]);
      }
    }
    if (this.newCountries.length === 0) {
      this.newCountries = Object.keys(form.value);
    }

  }

  changeColor(elem: string, form: NgForm, name: string): void {
    let keyValue = form.control.controls[`${name}`].value;

    if (keyValue === true) {
      let element = <HTMLElement>document.querySelector(`#${elem}`);
      element.style.backgroundColor = '';
    } else {
      let element = <HTMLElement>document.querySelector(`#${elem}`);
      element.style.backgroundColor = 'rgba(172, 255, 47, 0.35)';
      element.style.borderRadius = '5px';
    }
    console.log(elem);
  }
  getCountries(): void {
    this.selectedHotels = [];
    this.newCountries = [];

    this.database.getCountries().subscribe(
      (data) => {
        this.countries = data;
        console.log(this.countries);
        this.countries.forEach(elem => {
          if (elem.travelStatus === 1) {
            elem.travelStatus = 'Доступний';
          } else if (elem.travelStatus === 0) {
            elem.travelStatus = 'Недоступний';
          }
        })
      },
      error => console.log("Error: " + error)
    )
  }

  async checkSelectedHotel(): Promise<void> {
    this.selectedHotels = [];

    if (this.newCountries.length === 0) {
      this.getCountries()
      this.countries.forEach(elem => {
        this.newCountries.push(elem.name);
      })
    }
    this.newCountries.forEach((element, index) => {
      this.getHotels(element, index);
    });
  }

  getHotels(hotel: string, i: number): void {
    this.database.getHotels(hotel).subscribe(
      async data => {

        data.forEach(elem => {
          let hotels: IHotel = {
            id: elem.id,
            name: elem.name,
            availableRooms: elem.availableRooms,
            availableInDate: elem.availableInDate,
            city: elem.city,
            country: elem.country,
          };
          this.selectedHotels.push(hotels)
        })
      },
      error => console.log("Error: " + error)
    )
  }


  sideMenuChange(): void {
    this.AboutUsCheck = false;
    this.countryCheck = false;
    this.buyTicketCheck = false;
    this.bookHotelCheck = false;
  }

}
