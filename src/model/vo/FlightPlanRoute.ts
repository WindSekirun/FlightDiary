export class FlightPlanRouteData {
  headers: FlightPlanTableHeader[];
  contents: FlightPlanTableContent[];
  length: number;
}

export class FlightPlanTableHeader {
  text: string;
  align = "start";
  sortable = false;
  value = "";

  constructor(name: string, value: string) {
    this.text = name;
    this.value = value;
  }
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

export const HEADER_ICON = new FlightPlanTableHeader("", "icon");
export const HEADER_IDENT = new FlightPlanTableHeader("Ident", "ident");
export const HEADER_REGION = new FlightPlanTableHeader("Region", "region");
export const HEADER_NAME = new FlightPlanTableHeader("Name", "name");
export const HEADER_PROCEDURE = new FlightPlanTableHeader(
  "Procedure",
  "procedure"
);
export const HEADER_AIRWAY = new FlightPlanTableHeader(
  "Airway or Procedure",
  "airway"
);
export const HEADER_RESTRICT = new FlightPlanTableHeader(
  "Restriction ft/kts",
  "restrictionKt"
);
export const HEADER_TYPE = new FlightPlanTableHeader("Type", "type");
export const HEADER_FREQ = new FlightPlanTableHeader("Freq MHz", "freq");
export const HEADER_DISTANCE = new FlightPlanTableHeader(
  "Distance nm",
  "distance"
);
export const HEADER_WIND = new FlightPlanTableHeader("Wind °M/kts", "wind");
