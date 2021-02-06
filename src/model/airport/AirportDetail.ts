import { Frequency } from "./Frequency";
import { Runway } from "./Runway";

export interface AirportDetail {
  ICAO: string;
  IATA: string;
  name: string;
  lat: number;
  lon: number;
  elevation: number;
  regionName: string;
  magneticVariation: number;
  runwayCount: number;
  runways: Runway[];
  frequencies: Frequency[];
}
