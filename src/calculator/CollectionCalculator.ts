import { Metadata } from "@/model/plan/Metadata";
import { Waypoint } from "@/model/plan/Waypoint";

export function mergeCollectionWaypoint(metadataList: Metadata[]): Waypoint[] {
  const wayPoints: Waypoint[] = [];
  metadataList.forEach((element: Metadata, index: number) => {
    if (index == 0) {
      element.waypoint.forEach((element) => wayPoints.push(element));
    } else {
      element.waypoint.forEach((waypoint: Waypoint, index: number) => {
        if (index != 0) {
          wayPoints.push(waypoint);
        }
      });
    }
  });
  return wayPoints.filter((element) => element.lat != 0 && element.lng != 0);
}
