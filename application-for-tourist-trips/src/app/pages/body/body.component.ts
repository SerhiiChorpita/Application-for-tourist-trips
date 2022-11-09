import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICountries } from 'src/app/shared/interfaces/countries/countries.interface';
import { IDate } from 'src/app/shared/interfaces/dates/dates.interface';
import { IHotel } from 'src/app/shared/interfaces/hotels/hotels.interface';
import { ITicket, ITicketAir } from 'src/app/shared/interfaces/tickets/tickets.interface';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  public page1: number = 1;
  public page2: number = 1;
  public page3: number = 1;
  public pageSize1: number = 4;
  public pageSize2: number = 4;
  public pageSize3: number = 4;

  public orderedTour: boolean = false;
  public btnDisabled: boolean = false;

  public countries: Array<ICountries> = [];
  public countries2: Array<ICountries> = [];
  public selectedCountries: Array<string> = [];
  public newCountries: Array<string> = [];

  public hotelsCount: Array<IHotel> = [];
  public hotelCount: number = 0;

  public noWayHotels: Array<IHotel> = [];
  public hotels: Array<IHotel> = [];
  public selectedHotels: Array<string> = [];
  public newHotels: Array<string> = [];
  public clientDate!: IDate;

  public allDate: Array<IDate> = [];
  public selectedDate: boolean = false;
  public selectedDate2: boolean = false;
  public availableInDate!: IDate;

  public tickets: Array<IHotel> = [];
  public selectedTickets: Array<string> = [];
  public newTickets: Array<string> = [];
  public toSelectTickets: Array<ITicket> = [];

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
    this.getCountryCount();
    this.dateGenerator();
  }

  clientDateStatus(clientDate: IDate): void {
    this.clientDate = clientDate;
    this.getCountryCount();
  }

  getCountryCount(): void {
    let hotel: IHotel;
    let indxGenr!: number;
    let costGenr!: number;
    let nights: string;

    this.database.getCountries().subscribe(
      (data): Array<IHotel> => {
        this.countries = data;
        this.countries.forEach(elem => {
          if (elem.travelStatus === 1) {
            elem.travelStatus = 'Available';
          } else if (elem.travelStatus === 0) {
            elem.travelStatus = 'Not available';
          }
          this.database.getHotels(elem.name).subscribe(
            (data) => {
              data.forEach((elem) => {
                getRndInteger(2, 7);
                getCost(indxGenr * 120, indxGenr * 150);
                nightCheck(indxGenr);
                hotel = {
                  id: elem.id,
                  name: elem.name,
                  availableRooms: elem.availableRooms,
                  availableInDate: this.allDate[elem.id - 1],
                  city: elem.city,
                  country: elem.country,
                  info: `Tour on ${indxGenr} ${nights}, cost ${costGenr} $`
                };
                this.noWayHotels.push(hotel);
              });
              return this.noWayHotels
            },
            error => console.log("Error: " + error)
          );
          return this.countries;
        });
        return this.noWayHotels;
      },
      error => console.log("Error: " + error)
    )

    function getRndInteger(min: number, max: number): number {
      return indxGenr = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getCost(min: number, max: number): number {
      return costGenr = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function nightCheck(arg: number): void {
      switch (arg) {
        case 1:
          nights = 'night';
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          nights = 'nights';
          break;
        default:
          nights = '';
      }
    }

    this.countries.forEach((elem): void => {
      for (let i = 0; i < this.noWayHotels.length; i++) {
        if (this.noWayHotels[i].country !== elem.name) {
          this.hotelCount = 0;
        }
        if (this.noWayHotels[i].country === elem.name) {
          let checkDate = this.allDate[this.noWayHotels[i].id - 1].day;
          if (checkDate >= this.clientDate.day) {
            this.hotelCount++
            elem.availableHotels = this.hotelCount;
          }
        }
      }
    })
    if (this.selectedDate) {
      this.countries2 = this.countries;
      this.sideMenuChange();
      this.countryCheck = true;
      this.selectedDate2 = true;

    }
    this.selectedDate = true;
  }

  dateGenerator(): void {
    let date = new Date;
    let dd: number = date.getDate();
    let mm: number = date.getMonth() + 1;
    let yyyy: number = date.getFullYear();

    for (let i = 0; i < 40; i++) {
      let dayGenerator!: number;
      function getRndInteger(min: number, max: number): number {
        return dayGenerator = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      getRndInteger(dd, 30)

      this.availableInDate = {
        day: dayGenerator,
        month: mm,
        year: yyyy
      }
      this.allDate.push(this.availableInDate);
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
            elem.travelStatus = 'Available';
          } else if (elem.travelStatus === 0) {
            elem.travelStatus = 'Not available';
          }
        })
      },
      error => console.log("Error: " + error)
    )
  }

  selectedTicketCheck(form: NgForm): void {
    this.newTickets.splice(0);
    this.selectedTickets.splice(0);

    for (let key in form.value) {
      this.selectedTickets.push(key)
    }

    let newSelectedH = this.selectedTickets;
    let keyValue = (i: number) => form.control.controls[`${this.selectedTickets[(i)]}`].value;

    for (let i = 0; i < newSelectedH.length; i++) {
      if (keyValue(i)) {
        this.newTickets.push(this.selectedTickets[i]);

      }
    }
    if (this.newTickets.length === 0) {
      // this.newTickets = Object.keys(form.value);
      this.newTickets.push(form.value);
    }
  }

  async checkSelectedTicket(): Promise<void> {
    this.tickets.splice(0);
    let arrTick: Array<ITicketAir> = [];
    let objTick: ITicketAir;

    for (let i = 0; i < 40; i++) {
      if (this.newTickets[i] !== undefined) {
        objTick = {
          dir: this.newTickets[i]
        }
        arrTick.push(objTick);
      }
    }
    arrTick.forEach((item, index, array) => {
      this.getTickets(item.dir);
    });
  }

  getTickets(array: string): void {
    this.tickets.splice(0);
    this.newTickets.splice(0);
    let newTicket: ITicket;
    let indxGenr!: number;
    let costGenr!: number;

    this.hotels.forEach(elem => {
      if (elem.name === array) {
        this.database.getTickets().subscribe(
          (data) => {
            getRndInteger(0, 4)
            getCost(800, 1250)

            newTicket = {
              nameAirline: data[indxGenr].nameAirline,
              numberOfSeats: elem.availableRooms * 3,
              cost: costGenr,
              flightCity: elem.city,
              flightDates: elem.availableInDate,
            }
            this.toSelectTickets.push(newTicket);
          },
          error => console.log("Error: " + error)
        )
      }
    })


    function getRndInteger(min: number, max: number): number {
      return indxGenr = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getCost(min: number, max: number): number {
      return costGenr = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  async checkSelectedHotel(): Promise<void> {
    this.hotels.splice(0);

    if (this.newCountries.length === 0) {
      this.getCountries();
      this.countries.forEach(elem => {
        this.newCountries.push(elem.name);
      })
    }
    this.newCountries.forEach((element) => {
      this.getHotels(element);
    });
  }

  getHotels(hotel: string): void {
    let costGenr: number;
    let indxGenr: number;
    let nights: string;

    this.database.getHotels(hotel).subscribe(
      async data => {
        data.forEach(elem => {

          getRndInteger(2, 7);
          getCost(indxGenr * 120, indxGenr * 150);
          nightCheck(indxGenr);
          let hotel: IHotel = {
            id: elem.id,
            name: elem.name,
            availableRooms: elem.availableRooms,
            availableInDate: this.allDate[elem.id - 1],
            city: elem.city,
            country: elem.country,
            info: `Tour on ${indxGenr} ${nights}, cost ${costGenr} $`
          };
          this.hotels.push(hotel);
        })
      },
      error => console.log("Error: " + error)
    )
    function getRndInteger(min: number, max: number): number {
      return indxGenr = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getCost(min: number, max: number): number {
      return costGenr = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function nightCheck(arg: number): void {
      switch (arg) {
        case 1:
          nights = 'night';
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          nights = 'nights';
          break;
        default:
          nights = '';
      }
    }
  }

  sideMenuChange(): void {
    this.AboutUsCheck = false;
    this.countryCheck = false;
    this.buyTicketCheck = false;
    this.bookHotelCheck = false;
  }

  orderTour(form: NgForm, tickets: ITicket[]): void {
    if (tickets) {
      tickets.forEach(elem => {
        let keyValue = form.control.controls[`${elem.nameAirline}`].value;
        if (keyValue) {
          this.orderedTour = true;
        }
      })
    }
  }

  repeat(): void {
    this.orderedTour = false;
  }
  success(): void {
    this.database.getOrder().subscribe(
      (data) => {
        this.AboutUsCheck = true;
        this.orderedTour = false;
        this.buyTicketCheck = false;
        alert('order received, wait for communication with the operator.')
      },
      error => console.log("Error: " + error)
    )
  }

}
