import { DataTableHeader } from "../DataTableHeader";

export class FlightPlanRouteData {
  headers: DataTableHeader[];
  contents: FlightPlanTableContent[];
  length: number;
}

export class FlightPlanTableContent {
  icon: string;
  ident: string;
  region: string;
  name: string;
  procedure: string;
  airway: string;
  restrictionKt: string;
  type: string;
  freq: string;
  distance: string;
  wind: string;
  key: string;
}

export const HEADER_ICON = new DataTableHeader("", "icon");
export const HEADER_IDENT = new DataTableHeader("Ident", "ident");
export const HEADER_REGION = new DataTableHeader("Region", "region");
export const HEADER_NAME = new DataTableHeader("Name", "name");
export const HEADER_PROCEDURE = new DataTableHeader(
  "Procedure",
  "procedure"
);
export const HEADER_AIRWAY = new DataTableHeader(
  "Airway or Procedure",
  "airway"
);
export const HEADER_RESTRICT = new DataTableHeader(
  "Restriction ft/kts",
  "restrictionKt"
);
export const HEADER_TYPE = new DataTableHeader("Type", "type");
export const HEADER_FREQ = new DataTableHeader("Freq MHz", "freq");
export const HEADER_DISTANCE = new DataTableHeader(
  "Distance nm",
  "distance"
);
export const HEADER_WIND = new DataTableHeader("Wind °M/kts", "wind");
