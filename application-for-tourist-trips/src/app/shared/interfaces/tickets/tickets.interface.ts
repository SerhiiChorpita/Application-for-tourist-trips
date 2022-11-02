import { Data } from "@angular/router";

export interface ITicket {
    nameAirline: string,
    numberOfSeats: number,
    flightCity: string,
    flightDates: Data,
}