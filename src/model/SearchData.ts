export class SearchData {
  departure = "";
  destination = "";
  aircraft = "";

  constructor(departure: string, destination: string, aircraft: string) {
    this.departure = departure;
    this.destination = destination;
    this.aircraft = aircraft;
  }
}
