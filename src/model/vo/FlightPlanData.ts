import { LatLng, LatLngBounds } from "leaflet";
import { MarkerData } from "./MarkerData";

export class FlightPlanData {
  planTitle: string;
  planRoute: string;
  bounds: LatLngBounds;
  markers: MarkerData[];
}
