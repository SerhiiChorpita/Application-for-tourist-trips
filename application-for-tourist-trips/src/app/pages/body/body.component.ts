import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ICountries } from 'src/app/shared/interfaces/countries/countries.interface';
import { IDate } from 'src/app/shared/interfaces/dates/dates.interface';
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

  public hotelsCount: Array<IHotel> = [];
  public hotelCount: number = 0;


  public hotels: Array<IHotel> = [];
  public selectedHotels: Array<string> = [];
  public newHotels: Array<string> = [];
  public availableInDate!: IDate;
  public clientDate!: IDate;

  public tickets: Array<IHotel> = [];
  public selectedTickets: Array<string> = [];
  public newTickets: Array<string> = [];

  public blockedHotels: boolean = false;
  public blockedTickets: boolean = false;

  public AboutUsCheck: boolean = true;
  public countryCheck: boolean = false;
  public bookHotelCheck: boolean = false;
  public buyTicketCheck: boolean = false;


  constructor(
    private database: DatabaseService,
    private shareData: ShareDataService,
  ) {
    shareData.myDateChanged.subscribe(clientDate => this.clientDateStatus(clientDate));
  }

  ngOnInit(): void {
    this.getCountries();
  }

  selectedHotelCheck(form: NgForm): void {
    this.newHotels.splice(0);
    this.selectedHotels.splice(0);

    for (let key in form.value) {
      this.selectedHotels.push(key)
    }

    let newSelectedC = this.selectedHotels;
    let keyValue = (i: number) => form.control.controls[`${this.selectedHotels[(i)]}`].value;

    for (let i = 0; i < newSelectedC.length; i++) {
      if (keyValue(i)) {
        this.newHotels.push(this.selectedHotels[i]);
      }
    }
    if (this.newHotels.length === 0) {
      this.newHotels = Object.keys(form.value);
    }
  }


  selectedCountriesCheck(form: NgForm): void {
    this.newCountries.splice(0);
    this.selectedCountries.splice(0);

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
  }

  getCountries(): void {
    this.hotels.splice(0);
    this.newCountries.splice(0);

    this.database.getCountries().subscribe(
      (data) => {
        this.countries = data;
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
    this.hotels.splice(0);

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

  async checkSelectedTicket(): Promise<void> {
    this.hotels.splice(0);

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

  getCountryCount(): void {
    this.getCountries();
    this.checkSelectedHotel();
    console.log(this.countries);
    console.log(this.newHotels);
    console.log(this.hotels);

  }

  clientDateStatus(clientDate: IDate): void {
    this.clientDate = clientDate;
    this.getCountryCount();
  }

  dateGenerator(): IDate {
    let date = new Date;
    let dd: number = date.getDate();
    let mm: number = date.getMonth() + 1;
    let yyyy: number = date.getFullYear();

    if (this.clientDate === undefined) {
      this.clientDate = {
        day: dd,
        month: mm,
        year: yyyy
      }
    }

    let dayGenerator!: number;
    function getRndInteger(min: number, max: number): number {
      return dayGenerator = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getRndInteger(dd, 30)

    return this.availableInDate = {
      day: dayGenerator,
      month: mm,
      year: yyyy
    }
  }

  getHotels(hotel: string, i: number): void {
    this.database.getHotels(hotel).subscribe(
      async data => {
        data.forEach(elem => {
          this.dateGenerator();
          let hotels: IHotel = {
            id: elem.id,
            name: elem.name,
            availableRooms: elem.availableRooms,
            availableInDate: this.availableInDate,
            city: elem.city,
            country: elem.country,
          };
          this.hotels.push(hotels)
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
