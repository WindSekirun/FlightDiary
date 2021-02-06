import { Metadata } from "@/model/plan/Metadata";
import { displayNm } from "./UnitCalculator";

/**
 * Getting plan's title
 * @param metadata
 */
export function getPlanTitle(metadata: Metadata): string {
  return `${metadata.planType} ${metadata.departure.icao} → ${metadata.destination.icao}`;
}

/**
 * Getting plan's subtitle
 * @param metadata
 */
export function getPlanSubtitle(metadata: Metadata): string {
  return `${metadata.flightTime} | ${displayNm(metadata.distance)} | ${
    metadata.aircraft
  }`;
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
