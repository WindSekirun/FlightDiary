import { displayFt } from "@/calculator/UnitCalculator";
import {
  FP_DEPARTURE,
  FP_DESTINATION,
  FP_DME,
  FP_ILS,
  FP_TAC,
  FP_WAYPOINT,
  TRANSPARENT_ICON
} from "@/Constants";
import { LatLng } from "leaflet";
import { Runway } from "../airport/Runway";
import { Waypoint } from "../plan/Waypoint";

export class TooltipMaterial {
  index: number;
  lastIndex: number;
  waypoint: Waypoint;

  constructor(index: number, lastIndex: number, current: Waypoint) {
    this.index = index;
    this.lastIndex = lastIndex;
    this.waypoint = current;
  }
}

/**
 * Finding icon of Waypoint
 * @param index current index of waypoint
 * @param lastIndex last index of waypoint[]
 * @param waypoint waypoint object
 */
export function findIconOfWaypoint(material: TooltipMaterial): string {
  const { index, lastIndex, waypoint } = material;
  let markerIcon;
  if (index == 0) {
    // departure airport
    markerIcon = FP_DEPARTURE;
  } else if (index == lastIndex) {
    // destination airport
    markerIcon = FP_DESTINATION;
  } else if (waypoint.type.includes("VORTAC")) {
    // VORTAC (H)
    markerIcon = FP_TAC;
  } else if (waypoint.type.includes("VORDME")) {
    // VORDME (H)
    markerIcon = FP_DME;
  } else if (waypoint.type.includes("ILS")) {
    // ILS
    markerIcon = FP_ILS;
  } else if (waypoint.ident == "" && waypoint.isProcedure) {
    // if waypoint is procedure and ident is empty
    markerIcon = FP_ILS;
  } else {
    markerIcon = FP_WAYPOINT;
  }

  return markerIcon;
}

export function buildTooltipOfWaypoint(material: TooltipMaterial) {
  const { index, lastIndex, waypoint } = material;
  const ident = waypoint.ident;
  let tooltip;
  if (index == 0) {
    tooltip = `Departure ${ident}`;
  } else if (index == lastIndex) {
    tooltip = `Destination ${ident}`;
  } else if (waypoint.type != "") {
    tooltip = `${waypoint.type} - ${ident}`;
    if (waypoint.alt != "") {
      tooltip += ` in ${displayFt(waypoint.alt)}`;
    }
  } else {
    tooltip = `${ident}`;
    if (waypoint.alt != "") {
      tooltip += ` in ${displayFt(waypoint.alt)}`;
    }
  }
  return tooltip;
}

export function buildHeadline(material: TooltipMaterial): string {
  const { index, lastIndex, waypoint } = material;
  const ident = waypoint.ident;
  if (index == 0 || index == lastIndex || waypoint.type != "") {
    return ident;
  } else {
    return "";
  }
}

export class MarkerData {
  latLng: LatLng;
  anchor: number[];
  icon: string;
  ident: string;
  tooltipText: string;
  headline: string;

  static makeByWaypoint(
    index: number,
    lastIndex: number,
    current: Waypoint
  ): MarkerData {
    const material = new TooltipMaterial(index, lastIndex, current);
    const data = new MarkerData();
    data.latLng = new LatLng(current.lat, current.lng);
    data.anchor = [10, 12];
    data.icon = findIconOfWaypoint(material);
    data.ident = current.ident;
    data.tooltipText = buildTooltipOfWaypoint(material);
    data.headline = buildHeadline(material);
    return data;
  }

  static makeByRunway(runway: Runway, latLng: LatLng): MarkerData {
    const data = new MarkerData();
    data.anchor = [10, 20];
    data.latLng = latLng;
    data.icon = TRANSPARENT_ICON;
    data.headline = runway.ident;
    return data;
  }
}