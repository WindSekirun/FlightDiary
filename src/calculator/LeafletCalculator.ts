import { MarkerData } from "@/model/vo/MarkerData";
import { Metadata } from "@/model/plan/Metadata";
import { LatLngBounds, LatLngTuple } from "leaflet";


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

export function getWaypointMarker(metadata: Metadata): MarkerData[] {
  return metadata.waypoint.map((element) => {
    const markerData = new MarkerData();
    markerData.latLng = [element.lat, element.lng] as LatLngTuple;
    return markerData;
  });
}
