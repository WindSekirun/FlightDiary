import { End } from "./End";
import { Navaid } from "./Navaid";

export interface Runway {
  ident: string;
  width: number;
  length: number;
  bearing: number;
  surface: string;
  markings: string[];
  lighting: string[];
  thresholdOffset: number;
  overrunLength: number;
  ends: End[];
  navaids: Navaid[];
}
