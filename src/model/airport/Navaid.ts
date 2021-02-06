export interface Navaid {
  ident: string;
  type: string;
  lat: number;
  lon: number;
  airport: number;
  runway: string;
  frequency: number;
  slope?: number;
  bearing?: number;
  name: string;
  elevation: number;
  range: number;
}
