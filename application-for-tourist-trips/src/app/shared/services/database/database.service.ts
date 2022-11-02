import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountries } from '../../interfaces/countries/countries.interface';
import { IHotel } from '../../interfaces/hotels/hotels.interface';
import { ITicket } from '../../interfaces/tickets/tickets.interface';

@Injectable({
  providedIn: 'root'
})


export class DatabaseService {

  private countriesUrl = 'http://localhost:3002/countries';
  private ticketsUrl = 'http://localhost:3002/tickets';
  private successfulOrderUrl = 'http://localhost:3002/successfulorder';

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<ICountries[]> {
    return this.http.get<ICountries[]>(this.countriesUrl)
  }
  getHotels(hotel: string): Observable<IHotel[]> {
    let hotelsUrl = `http://localhost:3002/hotels/${hotel}`;
    return this.http.get<IHotel[]>(hotelsUrl)
  }
  getTickets(): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(this.ticketsUrl)
  }
  getOrder(): Observable<string[]> {
    return this.http.get<string[]>(this.successfulOrderUrl)
  }

}
