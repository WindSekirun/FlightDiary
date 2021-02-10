import { MarkerData } from "@/model/vo/MarkerData";
import { Metadata } from "@/model/plan/Metadata";
import { LatLng, LatLngBounds } from "leaflet";

/**
 * Getting Departure's LatLngs from Metadata
 * @param metadata Metadata object which contains departure data
 */
export function getDeparture(metadata: Metadata): LatLng {
  return new LatLng(metadata.waypoint[0].lat, metadata.waypoint[0].lng);
}

/**
 * Getting Destination's LatLngs from Metadata
 * @param metadata Metadata object which contains destination data
 */
export function getDestination(metadata: Metadata): LatLng {
  const index = metadata.waypoint.length - 1;
  return new LatLng(metadata.waypoint[index].lat, metadata.waypoint[index].lng);
}

/**
 * Calculate bounds of Leaflet
 * @param metadata Metadata object which contains departure, destination data
 */
export function getMapBounds(metadata: Metadata): LatLngBounds {
  return new LatLngBounds(getDeparture(metadata), getDestination(metadata));
}

/**
 * Getting waypoint's marker data from
 * @param metadata
 */
export function getWaypointMarker(metadata: Metadata): MarkerData[] {
  const lastIndex = metadata.waypoint.length - 1;
  return metadata.waypoint
    .map((element, index) => new MarkerData(index, lastIndex, element))
    .filter((element) => element.latLng.lat != 0 && element.latLng.lng != 0);
}
