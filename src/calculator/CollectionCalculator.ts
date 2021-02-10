import { Metadata } from "@/model/plan/Metadata";
import { Waypoint } from "@/model/plan/Waypoint";

export function mergeCollectionWaypoint(metadataList: Metadata[]) {
  const wayPoints: Waypoint[] = [];
  metadataList.forEach((element: Metadata, index: number) => {
    if (index == 0) {
      // 출발지/도착지 둘다 포함.
      wayPoints.concat(element.waypoint);
    } else {
      // 중간-마지막일 경우에는, 출발지만 제외하고 추가
      element.waypoint.forEach((waypoint: Waypoint, index: number) => {
        if (index != 0) {
          wayPoints.push(waypoint);
        }
      });
    }
  });
  return wayPoints.filter((element) => element.lat != 0 && element.lng != 0);
}
