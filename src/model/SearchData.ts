export class SearchData {
  departure: string = "";
  destination: string = "";
  aircraft: string = "";

  constructor(departure: string, destination: string, aircraft: string) {
    this.departure = departure;
    this.destination = destination;
    this.aircraft = aircraft;
  }
}
