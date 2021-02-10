import { CollectionDataItem } from "../collection/CollectionDataItem";
import { Metadata } from "../plan/Metadata";
import { Waypoint } from "../plan/Waypoint";

export class CollectionDetailData {
  item: CollectionDataItem;
  metadataList: Metadata[];
  waypoints: Waypoint[];
}
