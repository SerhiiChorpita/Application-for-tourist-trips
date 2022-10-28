import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountries } from '../../interfaces/countries/countries.interface';
import { IHotel } from '../../interfaces/hotels/hotels.interface';

@Injectable({
  providedIn: 'root'
})


export class DatabaseService {

  private countriesUrl = 'http://localhost:3002/countries';

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

}
