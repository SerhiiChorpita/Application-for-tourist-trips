import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ICountries } from 'src/app/shared/interfaces/countries/countries.interface';
import { IHotel } from 'src/app/shared/interfaces/hotels/hotels.interface';
import { DatabaseService } from 'src/app/shared/services/database/database.service';

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

  public AboutUsCheck: boolean = true;
  public countryCheck: boolean = false;
  public buyTicketCheck: boolean = false;
  public bookHotelCheck: boolean = false;

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit(): void {
    this.getCountries();
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
        console.log(this.selectedCountries[i]);
        this.newCountries.push(this.selectedCountries[i]);
      }
    }
    if (this.newCountries.length === 0) {
      this.newCountries = Object.keys(form.value);
    }

  }

  getCountries(): void {
    this.selectedHotels = [];
    this.newCountries = [];

    this.database.getCountries().subscribe(
      data => {
        this.countries = data;
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
          console.log('hotels', hotels);
          this.selectedHotels.push(hotels)
          console.log('selectedHotels', this.selectedHotels);
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
