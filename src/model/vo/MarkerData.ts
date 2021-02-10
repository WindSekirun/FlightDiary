import {
  buildTooltipOfWaypoint,
  findIconOfWaypoint
} from "@/calculator/PlanCalculator";
import { LatLng } from "leaflet";
import { Waypoint } from "../plan/Waypoint";

export class MarkerData {
  latLng: LatLng;
  anchor = [10, 12];
  icon: string;
  ident: string;
  tooltipText: string;

  constructor(index: number, lastIndex: number, current: Waypoint) {
    this.latLng = new LatLng(current.lat, current.lng);
    this.icon = findIconOfWaypoint(index, lastIndex, current);
    this.ident = current.ident;
    this.tooltipText = buildTooltipOfWaypoint(index, lastIndex, current);
  }
}
