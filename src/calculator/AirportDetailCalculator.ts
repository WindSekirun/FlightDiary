import { AirportDetailItem } from "@/model/airport/AirportDetailItem";
import {
  AirportFreqContent,
  AirportRunwayNavaidContent,
  AirportRunwaysContent
} from "@/model/vo/AirportData";
import { MarkerData } from "@/model/vo/MarkerData";
import center from "@turf/center";
import { points } from "@turf/helpers";
import { LatLng } from "leaflet";
import { calculateMeridian } from "./LeafletCalculator";

export function displayMagnetic(airport: AirportDetailItem) {
  const value = airport.magneticVariation;
  const direction = value > 0 ? "E" : "W";
  return `${value.toFixed(3)}° ${direction}`;
}

export function displayBearing(trueBearing: number, variation: number): string {
  let meg;
  if (variation < 0) {
    meg = trueBearing + variation;
  } else {
    meg = trueBearing - variation;
  }

  return `${trueBearing.toFixed(2)}° / ${meg.toFixed(2)}°`;
}

export function displayFreq(frequency: number): string {
  const mhz = frequency / 1000000.0;
  return `${mhz.toFixed(2)} MHz`;
}

export function displaySlope(slope: number): string {
  return `${slope.toFixed(2)}°`;
}

type calculateFn = (it: number) => string;
export function dash(it: number | undefined, fn: calculateFn) {
  if (it == 0 || it == null || it == undefined) {
    return "-";
  } else {
    return fn(it);
  }
}

export function getRunwayTableData(airport: AirportDetailItem) {
  const magneticVariation = airport.magneticVariation;
  return airport.runways.map(
    (element) => new AirportRunwaysContent(element, magneticVariation)
  );
}

export function getRunwayNavaidsData(airport: AirportDetailItem) {
  const magneticVariation = airport.magneticVariation;
  const list: AirportRunwayNavaidContent[] = [];
  airport.runways.forEach((element) => {
    element.navaids.forEach((navaid) => {
      list.push(
        new AirportRunwayNavaidContent(element.ident, navaid, magneticVariation)
      );
    });
  });
  return list.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

export function getAirportFrequency(airport: AirportDetailItem) {
  return airport.frequencies
    .map((element) => new AirportFreqContent(element))
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

export function getAirportMarkers(airport: AirportDetailItem) {
  const markers: MarkerData[] = [];
  airport.runways.forEach((element) => {
    markers.push(
      MarkerData.makeByRunway(
        element,
        calculateMeridian(new LatLng(element.ends[0].lat, element.ends[0].lon))
      )
    );
  });
  return markers;
}
