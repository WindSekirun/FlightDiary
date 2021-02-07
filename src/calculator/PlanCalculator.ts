import {
  FP_DEPARTURE,
  FP_DESTINATION,
  FP_DME,
  FP_ILS,
  FP_TAC,
  FP_WAYPOINT
} from "@/Constants";
import { Metadata } from "@/model/plan/Metadata";
import { Waypoint } from "@/model/plan/Waypoint";
import {
  FlightPlanRouteData,
  FlightPlanTableContent,
  HEADER_AIRWAY,
  HEADER_DISTANCE,
  HEADER_FREQ,
  HEADER_ICON,
  HEADER_IDENT,
  HEADER_NAME,
  HEADER_PROCEDURE,
  HEADER_REGION,
  HEADER_REMARKS,
  HEADER_RESTRICT,
  HEADER_TYPE,
  HEADER_WIND
} from "@/model/vo/FlightPlanRoute";
import { displayFt, displayNm } from "./UnitCalculator";

/**
 * Getting plan's title
 * @param metadata
 */
export function getPlanTitle(metadata: Metadata): string {
  return `${metadata.planType} ${metadata.departure.icao} → ${metadata.destination.icao}`;
}

/**
 * Getting plan's full title including airport name
 * @param metadata
 */
export function getFullPlanTitle(metadata: Metadata): string {
  return `${metadata.planType} ${metadata.departure.name} (${metadata.departure.icao}) → ${metadata.destination.name} (${metadata.destination.icao})`;
}

/**
 * Getting plan's approach information
 */
export function getApproachInformation(metadata: Metadata): string {
  const sid = metadata.procedures.sid;
  const approach = metadata.procedures.approach;

  let information = `Depart runway ${sid.runway} via SID ${sid.name} . `;
  if (approach.transition) {
    information += `Via ${approach.transition} and `;
  } else {
    information += `Via `;
  }

  information += `${approach.name} (${approach.arinc}) to runway ${approach.runway} .`;
  return information;
}

/**
 * Getting plan's subtitle
 * @param metadata
 */
export function getPlanSubtitle(metadata: Metadata): string {
  return `${metadata.flightTime} | ${displayNm(metadata.distance)} |
${displayFt(metadata.cruiseAlt)} | ${metadata.aircraft}`;
}

/**
 * Getting plan's route
 * @param metadata
 */
export function getPlanRoute(metadata: Metadata): string {
  return metadata.waypoint
    .filter((element) => !element.isProcedure)
    .map((element) => element.ident)
    .join(" ");
}

/**
 * Finding icon of Waypoint
 * @param index current index of waypoint
 * @param lastIndex last index of waypoint[]
 * @param waypoint waypoint object
 */
export function findIconOfWaypoint(
  index: number,
  lastIndex: number,
  waypoint: Waypoint
): string {
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

export function buildTooltipOfWaypoint(
  index: number,
  lastIndex: number,
  waypoint: Waypoint
) {
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

export function getFlightPlanRouteData(
  metadata: Metadata
): FlightPlanRouteData {
  const data = new FlightPlanRouteData();
  const lastIndex = metadata.waypoint.length - 1;
  data.headers = [
    HEADER_ICON,
    HEADER_IDENT,
    HEADER_REGION,
    HEADER_NAME,
    HEADER_PROCEDURE,
    HEADER_AIRWAY,
    HEADER_RESTRICT,
    HEADER_TYPE,
    HEADER_FREQ,
    HEADER_DISTANCE,
    HEADER_WIND,
    HEADER_REMARKS
  ];
  data.contents = metadata.waypoint.map((element, index) => {
    const route = new FlightPlanTableContent();
    route.icon = findIconOfWaypoint(index, lastIndex, element);
    route.ident = element.ident;
    route.region = element.region;
    route.name = element.name;
    route.procedure = element.procedure;
    route.airway = element.airway;
    route.restrictionKt = element.restrictKt;
    route.type = element.type;
    route.freq = element.freq;
    route.distance = element.distance;
    route.wind = element.wind;
    route.remarks = element.remarks;
    route.key = `${route.ident} - ${route.procedure} - ${route.airway}`;
    return route;
  });
  data.length = data.contents.length;
  return data;
}
