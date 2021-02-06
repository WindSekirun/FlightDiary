import { LatLngTuple } from "leaflet";

export class MarkerData {
  latLng: LatLngTuple;
  anchor: [number, number];
  icon: string;
  ident: string;
}
