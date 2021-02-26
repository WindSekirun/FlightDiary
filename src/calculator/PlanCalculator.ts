import { baseDomain } from "@/Constants";
import { Metadata } from "@/model/plan/Metadata";
import { FlightPlanTableContent, ImageData } from "@/model/vo/DetailData";
import {
  findIconOfWaypoint,
  MarkerData,
  TooltipMaterial
} from "@/model/vo/MarkerData";
import { LatLng } from "leaflet";
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

/**
 * Getting waypoint's marker data from
 * @param metadata
 */
export function getWaypointMarker(metadata: Metadata): MarkerData[] {
  const lastIndex = metadata.waypoint.length - 1;
  return metadata.waypoint
    .map((element, index) =>
      MarkerData.makeByWaypoint(index, lastIndex, element)
    )
    .filter((element) => element.latLng.lat != 0 && element.latLng.lng != 0);
}

export function getRouteTable(metadata: Metadata): FlightPlanTableContent[] {
  const lastIndex = metadata.waypoint.length - 1;
  return metadata.waypoint.map((element, index) => {
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
    route.isProcedure = element.isProcedure;
    route.latLng = new LatLng(element.lat, element.lng);
    return route;
  });
}

export function getPlanElevation(metadata: Metadata): [string[], number[]] {
  const contents: number[] = [];
  const headers: string[] = [];

  metadata.waypoint.forEach((waypoint) => {
    const alt = Number((waypoint.alt || "").replace(/\D/g, "")).valueOf();
    if (alt != 0 && waypoint.ident != "") {
      headers.push(waypoint.ident);
      contents.push(alt);
    }
  });

  return [headers, contents];
}
