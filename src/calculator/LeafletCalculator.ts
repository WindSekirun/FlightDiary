import { MarkerData } from "@/model/vo/MarkerData";
import { Metadata } from "@/model/plan/Metadata";
import { LatLng } from "leaflet";

/**
 * Getting waypoint's marker data from
 * @param metadata
 */
export function getWaypointMarker(metadata: Metadata): MarkerData[] {
  const lastIndex = metadata.waypoint.length - 1;
  return metadata.waypoint
    .map(
      (element, index) =>
        MarkerData.makeByWaypoint(index, lastIndex, element)
    )
    .filter((element) => element.latLng.lat != 0 && element.latLng.lng != 0);
}

export function calculateMeridian(latLng: LatLng): LatLng {
  if (latLng.lng < 0) {
    latLng.lng += 360;
  }
  return latLng;
}
