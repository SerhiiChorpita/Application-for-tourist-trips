import { IDate } from "../dates/dates.interface";

export interface ITicketAir {
    dir: string,
}
export interface ITicket {
    nameAirline: string,
    numberOfSeats: number,
    cost: number,
    flightCity: string,
    flightDates: IDate,
}