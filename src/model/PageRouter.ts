export class PageRouter {
  name: string;
  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}

export const pageHome = new PageRouter("Home", "/");
export const pageAbout = new PageRouter("About", "/about");
export const pageDetail = new PageRouter("Detail", "/detail/:id/:airport");
export const pageSpec = new PageRouter("Specs", "/spec");
export const pageCollection = new PageRouter("Collections", "/collection");
export const pageCollectionDetail = new PageRouter(
  "Collection Detail",
  "/collection/:id"
);
export const pageLogbook = new PageRouter("Logbook", "/logbook");
export const pageAirport = new PageRouter("Airports", "/airport");
export const pageAirportDetail = new PageRouter(
  "AirportsDetail",
  "/airport/:airport"
);
