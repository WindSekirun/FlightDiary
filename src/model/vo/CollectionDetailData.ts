import { CollectionDataItem } from "../collection/CollectionDataItem";
import { Metadata } from "../plan/Metadata";
import { Waypoint } from "../plan/Waypoint";
import { MarkerData } from "./MarkerData";
import { DataTableHeader } from "../DataTableHeader";
import { getPlanRoute } from "@/calculator/PlanCalculator";
import { displayFt } from "@/calculator/UnitCalculator";

export class CollectionDetailData {
  item: CollectionDataItem;
  metadataList: Metadata[];
  waypoints: Waypoint[];
  markers: MarkerData[];
  tableHeaders: DataTableHeader[];
  tableContents: CollectionDetailTableContent[];
}

export class CollectionDetailTableContent {
  id: string;
  departure: string;
  destination: string;
  flightTime: string;
  planType: string;
  cruiseAlt: string;
  distance: string;
  route: string;
  detailKey: string;

  constructor(metadata: Metadata) {
    this.id = metadata.id;
    this.departure = metadata.departure.label;
    this.destination = metadata.destination.label;
    this.flightTime = metadata.flightTime;
    this.planType = metadata.planType;
    this.cruiseAlt = displayFt(metadata.cruiseAlt);
    this.distance = metadata.distance;
    this.route = getPlanRoute(metadata);
    this.detailKey = metadata.departure.icao + metadata.destination.icao;
  }
}

export const HEADER_DEPARTURE = new DataTableHeader("Departure", "departure");
export const HEADER_DESTINATION = new DataTableHeader(
  "Destination",
  "destination"
);
export const HEADER_FLIGHT_TIME = new DataTableHeader(
  "FlightTime",
  "flightTime"
);
export const HEADER_PLAN_TYPE = new DataTableHeader("Plan Type", "planType");
export const HEADER_CRUISE_ALT = new DataTableHeader("Cruise At", "cruiseAlt");
export const HEADER_DISTANCE = new DataTableHeader("Distance", "distance");
export const HEADER_ROUTE = new DataTableHeader("Route", "route");

export const COLLECTION_DETAIL_TABLE_HEADER = [
  HEADER_DEPARTURE,
  HEADER_DESTINATION,
  HEADER_FLIGHT_TIME,
  HEADER_PLAN_TYPE,
  HEADER_CRUISE_ALT,
  HEADER_DISTANCE,
  HEADER_ROUTE
];
