import { IDate } from "../dates/dates.interface";

export interface IHotel {
    id: number,
    name: string,
    availableRooms: number,
    availableInDate: IDate,
    city: string,
    country: string
    info: string
}