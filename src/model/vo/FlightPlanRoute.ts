export class FlightPlanRouteData {
  header: FlightPlanTableHeader[];
  contents: FlightPlanTableContent[];
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
  remarks: string;
}

export const HEADER_IDENT = new FlightPlanTableHeader("Ident", "ident");
export const HEADER_REGION = new FlightPlanTableHeader("Region", "region");
export const HEADER_NAME = new FlightPlanTableHeader("Name", "name");
export const HEADER_PROCEDURE = new FlightPlanTableHeader("Procedure", "procedure");