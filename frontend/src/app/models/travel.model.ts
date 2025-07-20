export interface Travel {
  _id?: string;
  date: string;
  departure: string;
  destination: string;
  departureTime: string;
  price: number;
  seatsAvailable: number;
  busType: string;
  numberOfSeats: number;
  amenities: string[];
  description: string;
}