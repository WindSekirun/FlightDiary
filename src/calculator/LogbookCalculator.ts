import { Aircraft } from "@/model/list/Aircraft";
import { Airport } from "@/model/list/Airport";
import { ListItem } from "@/model/list/ListItem";
import { LogbookAirportContent, LogbookData } from "@/model/vo/LogbookData";
import { displayNm, strToNum } from "./UnitCalculator";

function nm(number: number) {
  return displayNm(`${number} nm`);
}

function findAirportName(airport: Airport[], icao: string): Airport {
  return airport.filter((element) => element.icao.includes(icao))[0];
}

function makeDistinctContent(map: Map<string, number>, airportList: Airport[]) {
  return Array.from(new Set(map.keys()))
    .sort()
    .map((element) => {
      const airport = findAirportName(airportList, element);
      return airport;
    })
    .filter((element) => element != undefined)
    .map((element) => LogbookAirportContent.makeByDefault(element));
}

function makeTop10Content(map: Map<string, number>, airportList: Airport[]) {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map((element) => {
      return LogbookAirportContent.makeByCount(
        findAirportName(airportList, element[0]),
        element[1]
      );
    });
}

export function parseLogbook(
  records: ListItem[],
  airportList: Airport[],
  aircraft: Aircraft[]
) {
  const data = new LogbookData();
  const distances = records.map((element) => strToNum(element.distance));
  const totalDistance = distances.reduce((a, b) => a + b, 0);
  const airports = new Map<string, number>();
  const departures = new Map<string, number>();
  const destinations = new Map<string, number>();

  records.forEach((element) => {
    const departureKey = element.departure.icao;
    const destinationKey = element.destination.icao;
    airports.set(departureKey, (airports.get(departureKey) || 0) + 1);
    airports.set(destinationKey, (airports.get(destinationKey) || 0) + 1);
    departures.set(departureKey, (departures.get(departureKey) || 0) + 1);
    destinations.set(
      destinationKey,
      (destinations.get(destinationKey) || 0) + 1
    );
  });

  data.totalDistance = nm(totalDistance);
  data.maxDistance = nm(Math.max.apply(null, distances));
  data.minDistance = nm(Math.min.apply(null, distances));
  data.averageDistance = nm(Math.floor(totalDistance / distances.length));
  data.distinctAircraft = aircraft;
  data.distinctDeparture = makeDistinctContent(departures, airportList);
  data.distinctDestination = makeDistinctContent(destinations, airportList);
  data.top10Airports = makeTop10Content(airports, airportList);
  data.top10Departure = makeTop10Content(departures, airportList);
  data.top10Destination = makeTop10Content(destinations, airportList);
  return data;
}
