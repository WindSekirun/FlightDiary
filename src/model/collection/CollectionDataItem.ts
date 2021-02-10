import { Airport } from "../list/Airport";

export interface CollectionDataItem {
  id: string;
  title: string;
  aircraft: string;
  flightStartTime: string;
  flightEndTime: string;
  flightStartPoint: Airport;
  flightEndPoint: Airport;
  flights: string[];
  distances: string[];
}
