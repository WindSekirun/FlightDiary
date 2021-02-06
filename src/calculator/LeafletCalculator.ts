import { MarkerData } from "@/model/vo/MarkerData";
import { Metadata } from "@/model/plan/Metadata";
import { LatLngBounds, LatLngTuple, marker } from "leaflet";
import { buildTooltipOfWaypoint, findIconOfWaypoint } from "./PlanCalculator";

/**
 * Getting Departure's LatLngs from Metadata
 * @param metadata Metadata object which contains departure data
 */
export function getDeparture(metadata: Metadata): LatLngTuple {
  return [metadata.waypoint[0].lat, metadata.waypoint[0].lng];
}

/**
 * Getting Destination's LatLngs from Metadata
 * @param metadata Metadata object which contains destination data
 */
export function getDestination(metadata: Metadata): LatLngTuple {
  const index = metadata.waypoint.length - 1;
  return [metadata.waypoint[index].lat, metadata.waypoint[index].lng];
}

/**
 * Calculate bounds of Leaflet
 * @param metadata Metadata object which contains departure, destination data
 */
export function getMapBounds(metadata: Metadata): LatLngBounds {
  return new LatLngBounds(getDeparture(metadata), getDestination(metadata));
}

/**
 * Getting waypoint's LatLngs from Metadata
 * @param metadata Metadata object which contains waypoint data
 */
export function getWaypointTuple(metadata: Metadata): LatLngTuple[] {
  return metadata.waypoint
    .map((element) => [element.lat, element.lng] as LatLngTuple)
    .filter((element) => element[0] != 0 && element[1] != 0);
}

/**
 * Getting waypoint's marker data from
 * @param metadata
 */
export function getWaypointMarker(metadata: Metadata): MarkerData[] {
  const lastIndex = metadata.waypoint.length - 1;
  return metadata.waypoint
    .map((element, index) => {
      const markerData = new MarkerData();
      markerData.latLng = [element.lat, element.lng] as LatLngTuple;
      markerData.anchor = [10, 12];
      markerData.icon = findIconOfWaypoint(index, lastIndex, element);
      markerData.ident = element.ident;
      markerData.tooltipText = buildTooltipOfWaypoint(
        index,
        lastIndex,
        element
      );
      return markerData;
    })
    .filter((element) => element.latLng[0] != 0 && element.latLng[1] != 0);
}
