import { MarkerData } from "@/model/vo/MarkerData";
import { Metadata } from "@/model/plan/Metadata";
import { LatLng } from "leaflet";



export function calculateMeridian(latLng: LatLng): LatLng {
  if (latLng.lng < 0) {
    latLng.lng += 360;
  }
  return latLng;
}
