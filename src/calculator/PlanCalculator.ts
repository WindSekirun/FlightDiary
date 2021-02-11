import { baseDomain } from "@/Constants";
import { Metadata } from "@/model/plan/Metadata";
import { ImageData } from "@/model/vo/DetailData";
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
  HEADER_RESTRICT,
  HEADER_TYPE,
  HEADER_WIND
} from "@/model/vo/FlightPlanRoute";
import { findIconOfWaypoint, TooltipMaterial } from "@/model/vo/MarkerData";
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
 * Getting plan's image list
 * @param metadata
 */
export function getPlanImageList(metadata: Metadata): ImageData[] {
  return metadata.images.map(
    (element) => new ImageData(`${baseDomain}data/${metadata.id}`, element)
  );
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
    HEADER_WIND
  ];
  data.contents = metadata.waypoint.map((element, index) => {
    const material = new TooltipMaterial(index, lastIndex, element);
    const route = new FlightPlanTableContent();
    route.icon = findIconOfWaypoint(material);
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
    route.key = `${route.ident} - ${route.procedure} - ${route.airway}`;
    return route;
  });
  data.length = data.contents.length;
  return data;
}
