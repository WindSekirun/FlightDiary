import {
  dash,
  displayBearing,
  displayFreq,
  displaySlope
} from "@/calculator/AirportDetailCalculator";
import { displayFtMFloor } from "@/calculator/UnitCalculator";
import { AirportDetailItem } from "../airport/AirportDetailItem";
import { Frequency } from "../airport/Frequency";
import { Navaid } from "../airport/Navaid";
import { Runway } from "../airport/Runway";
import { DataTableHeader, TableContents } from "../DataTableHeader";

export class AirportData {
  departure: AirportDetailItem;
  destination: AirportDetailItem;
}

export class AirportRunwaysContent implements TableContents {
  id: string;
  width: string;
  length: string;
  bearing: string;
  surface: string;
  threshold: string;
  overrun: string;
  markings: string;
  lighting: string;
  doNothing: boolean;

  constructor(runway: Runway, variation: number) {
    this.id = runway.ident;
    this.width = displayFtMFloor(runway.width);
    this.length = displayFtMFloor(runway.length);
    this.bearing = displayBearing(runway.bearing, variation);
    this.surface = runway.surface;
    this.threshold = displayFtMFloor(runway.thresholdOffset);
    this.overrun = displayFtMFloor(runway.overrunLength);
    this.markings = runway.markings.join(" ");
    this.lighting = runway.lighting.join(" ");
  }
}

export class AirportRunwayNavaidContent implements TableContents {
  runway: string;
  type: string;
  ident: string;
  frequency: string;
  range: string;
  bearing: string;
  slope: string;
  elevation: string;
  sortKey: string;
  doNothing: boolean;

  constructor(runway: string, navaid: Navaid, variation: number) {
    this.runway = runway;
    this.type = navaid.type;
    this.ident = navaid.ident;
    this.frequency = dash(navaid.frequency, (it): string => displayFreq(it));
    this.range = dash(navaid.range, (it): string => displayFtMFloor(it));
    this.bearing = dash(navaid.bearing, (it): string =>
      displayBearing(it, variation)
    );
    this.slope = dash(navaid.slope, (it): string => displaySlope(it));
    this.elevation = displayFtMFloor(navaid.elevation);
    this.sortKey = `${this.runway}${this.type}`;
  }
}

export class AirportFreqContent {
  type: string;
  frequency: string;
  name: string;
  sortKey: string;

  constructor(freq: Frequency) {
    switch (freq.type) {
      case "GND":
        this.type = "Ground";
        break;
      case "APP":
        this.type = "Approach";
        break;
      case "CLD":
        this.type = "Clearance";
        break;
      case "TWR":
        this.type = "Tower";
        break;
      case "COM":
        this.type = "Unicom";
        break;
      case "REC":
        this.type = "Recorded";
        break;
      case "DEP":
        this.type = "Departure";
        break;
    }

    this.frequency = displayFreq(freq.frequency);
    this.name = freq.name;
    this.sortKey = `${this.name}${freq.frequency}`;
  }
}

export const HEADER_ID = new DataTableHeader("ID", "id");
export const HEADER_WIDTH = new DataTableHeader("Width", "width");
export const HEADER_LENGTH = new DataTableHeader("Length", "length");
export const HEADER_BEARING = new DataTableHeader("Bearing", "bearing");
export const HEADER_SURFACE = new DataTableHeader("Surface", "surface");
export const HEADER_THRESHOLD = new DataTableHeader("Threshold", "threshold");
export const HEADER_OVERRUN = new DataTableHeader("Overrun", "overrun");
export const HEADER_MARKINGS = new DataTableHeader("Markings", "markings");
export const HEADER_LIGHTING = new DataTableHeader("Lighting", "lighting");
export const AIRPORT_HEADER_RUNWAYS = [
  HEADER_ID,
  HEADER_WIDTH,
  HEADER_LENGTH,
  HEADER_BEARING,
  HEADER_SURFACE,
  HEADER_THRESHOLD,
  HEADER_OVERRUN,
  HEADER_MARKINGS,
  HEADER_LIGHTING
];

export const HEADER_RUNWAY = new DataTableHeader("Runway", "runway");
export const HEADER_TYPE = new DataTableHeader("Type", "type");
export const HEADER_IDENT = new DataTableHeader("Ident", "ident");
export const HEADER_FREQ = new DataTableHeader("Frequency", "frequency");
export const HEADER_RANGE = new DataTableHeader("Range", "range");
export const HEADER_SLOPE = new DataTableHeader("Slope", "slope");
export const HEADER_ELEVATION = new DataTableHeader("Elevation", "elevation");
export const AIRPORT_HEADER_NAVAIDS = [
  HEADER_RUNWAY,
  HEADER_TYPE,
  HEADER_IDENT,
  HEADER_FREQ,
  HEADER_RANGE,
  HEADER_BEARING,
  HEADER_SLOPE,
  HEADER_ELEVATION
];

export const HEADER_NAME = new DataTableHeader("Name", "name");
export const AIRPORT_HEADER_FREQ = [HEADER_TYPE, HEADER_FREQ, HEADER_NAME];
