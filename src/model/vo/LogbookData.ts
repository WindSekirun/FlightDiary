import { DataTableHeader, TableContents } from "../DataTableHeader";
import { Aircraft } from "../list/Aircraft";
import { Airport } from "../list/Airport";

export class LogbookData {
  totalDistance: string;
  maxDistance: string;
  minDistance: string;
  averageDistance: string;
  distinctAircraft: Aircraft[];
  distinctDeparture: LogbookAirportContent[];
  distinctDestination: LogbookAirportContent[];
  top10Airports: LogbookAirportContent[];
  top10Departure: LogbookAirportContent[];
  top10Destination: LogbookAirportContent[];
}

export const HEADER_ICAO = new DataTableHeader("ICAO", "ident");
export const HEADER_NAME = new DataTableHeader("Name", "name");
export const HEADER_VISIT = new DataTableHeader("Visit", "counter");

export class LogbookAirportContent implements TableContents {
  ident: string;
  name: string;
  counter: number;
  doNothing: boolean;

  static makeByDefault(airport: Airport) {
    const content = new LogbookAirportContent();
    content.ident = airport.icao;
    content.name = airport.name;
    return content;
  }

  static makeByCount(airport: Airport, count: number) {
    const content = new LogbookAirportContent();
    content.ident = airport.icao;
    content.name = airport.name;
    content.counter = count;
    return content;
  }
}
