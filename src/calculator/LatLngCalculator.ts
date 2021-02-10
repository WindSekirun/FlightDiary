import { LatLng } from "leaflet";

export const degree = 180 / Math.PI;
export const radian = Math.PI / 180;

function calculateAnti(latLng: LatLng): number {
  return latLng.lng > 0 ? 180 - latLng.lng : 180 + latLng.lng;
}

function attachIntersection(current: LatLng, next: LatLng): LatLng[] {
  /*
   * Resolve break-line polyline by Spherical Coordinates (https://mathworld.wolfram.com/SphericalCoordinates.html)
   *
   * Legend: lat0, lon0 is represented as current.lat, current,lng.
   * For lat1, lon1, also represented as next.lat, next.lng.
   *
   * (x0, y0, z0) = (cos(lon0)*sin(lat0), sin(lon0)*sin(lat0), cos(lat0))
   * (x1, y1, z1) = (cos(lon1)*sin(lat1), sin(lon1)*sin(lat1), cos(lat1))
   * t: t = y1 / (y1 - y0).
   * (x, y, z) = (t * x0 + (1-t) * x1, 0, t * z0 + (1-t) * z1)
   * lat2 = ATan(z/x)
   *
   * Attaching:
   * current
   * a -> if current.lng is negative, use (lat2, -180) otherwise (lat2, 180)
   * b -> if next.lng is negative, use (lat2, -180) otherwise (lat2, 180)
   * next
   *
   * If neither break point exists, attaching [current, next]
   */
  if (Math.abs(current.lng - next.lng) > 180.0) {
    const currentDistToAnti = calculateAnti(current);
    const nextDistToAnti = calculateAnti(next);
    const latDiff = Math.abs(current.lat - next.lat);
    const angleAtan = Math.atan(latDiff / (currentDistToAnti + nextDistToAnti));
    const angle = angleAtan * degree * (current.lng > 0 ? 1 : -1);
    const latDiffAnti = Math.tan(angle * radian) * currentDistToAnti;
    const intersection = current.lat + latDiffAnti;
    const a = new LatLng(intersection, current.lng > 0 ? 180 : -180);
    const b = new LatLng(intersection, next.lng > 0 ? 180 : -180);
    return [current, a, b, next];
  } else {
    return [current, next];
  }
}

export function getPolylineData(latLngs: LatLng[]): LatLng[] {
  const newList: LatLng[] = [];
  latLngs.forEach((current: LatLng, index: number) => {
    const next = latLngs[index + 1];
    if (next != undefined) {
      newList.concat(attachIntersection(current, next));
    } else {
      newList.push(current); // for last item, we don't need to attach intersection
    }
  });
  return newList;
}
