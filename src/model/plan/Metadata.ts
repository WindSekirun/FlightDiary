import { Airport } from "../list/Airport";
import { Procedures } from "./Procedures";
import { Waypoint } from "./Waypoint";

export interface Metadata {
  id: string;
  departure: Airport;
  destination: Airport;
  flightTime: string;
  aircraft: string;
  mainThumbnail: string;
  images: string[];
  flightPlanFile: string;
  planType: string;
  cruiseAlt: string;
  distance: string;
  procedures: Procedures;
  waypoint: Waypoint[];
}
