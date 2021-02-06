import { LatLngBounds, LatLngTuple } from "leaflet";
import { MarkerData } from "./MarkerData";

export class FlightPlanData {
  planTitle: string;
  planRoute: string;
  bounds: LatLngBounds;
  latLngs: LatLngTuple[];
  markers: MarkerData[];
}
