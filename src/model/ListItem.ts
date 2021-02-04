import { Airport } from "./Airport";

export interface ListItem {
  id: string;
  departure: Airport;
  destination: Airport;
  flightTime: string;
  mainThumbnail: string;
  aircraft: string;
}
