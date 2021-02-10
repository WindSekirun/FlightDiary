<template>
  <div>
    <v-btn
      class="mt-2 d-xs-flex d-sm-flex d-md-none"
      color="#2e3440"
      block
      @click="fitToPlan()"
    >
      Fit to Plan
    </v-btn>
    <v-responsive :aspect-ratio="mapAspectRatio">
      <l-map
        ref="myMap"
        :bounds="latLngBounds"
        :options="{
          scrollWheelZoom: false
        }"
        @ready="readyLeaflet"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <!-- <l-polyline :lat-lngs="planData.latLngs" color="#4c566a"></l-polyline> -->
        <l-control>
          <v-btn
            class="mt-2 mr-2 d-none d-md-flex"
            color="#2e3440"
            @click="fitToPlan()"
          >
            Fit to Plan
          </v-btn>
        </l-control>
        <l-control :position="'bottomleft'" class="map-watermark">
          {{ title }}
        </l-control>
        <!-- <div v-for="(marker, index) in markers" :key="index">
          <l-marker :lat-lng="marker.latLng">
            <l-tooltip :options="{ direction: 'top' }">
              {{ marker.tooltipText }}
            </l-tooltip>
            <l-icon :icon-anchor="marker.anchor" class-name="marker-icon">
              <img :src="marker.icon" />
            </l-icon>
          </l-marker>
        </div> -->
      </l-map>
    </v-responsive>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  LatLng,
  LatLngBounds,
  LatLngExpression,
  Map,
  Point,
  polyline
} from "leaflet";
import { ATTRIBUTION, OPENSTREETMAP } from "@/Constants";
import { MarkerData } from "@/model/vo/MarkerData";
import { first } from "lodash";

@Component({
  components: {},
  computed: {}
})
export default class LeafletMap extends Vue {
  @Prop({ type: LatLngBounds }) latLngBounds!: LatLngBounds;
  @Prop({ type: Array }) markers: MarkerData[];
  @Prop({ type: String }) title: string;
  @Prop({ default: OPENSTREETMAP }) url!: string;
  @Prop({ default: ATTRIBUTION }) attribution!: string;
  map!: Map;

  polylineOptions = {
    color: "#4c566a"
  };
  degree = 180 / Math.PI;
  radian = Math.PI / 180;

  get mapAspectRatio() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return 16 / 9;
      case "md":
        return 16 / 9;
      case "lg":
        return 21 / 9;
      default:
        return 25 / 9;
    }
  }

  readyLeaflet(mapObject: Map) {
    // fit bounds from Metadata
    this.map = mapObject;
    this.fitToPlan();
    const a = new LatLng(35.777054, 140.382431);
    const b = new LatLng(61.174202, -149.997498);
    this.attachIntersection(a, b, mapObject);
  }

  fitToPlan() {
    this.map.fitBounds(this.latLngBounds, {
      paddingTopLeft: new Point(25, 25),
      paddingBottomRight: new Point(25, 25)
    });
  }

  addPolyline(tuple: LatLngExpression[], map: Map) {
    polyline(tuple, this.polylineOptions).addTo(map);
  }

  calculateAnti(latLng: LatLng): number {
    return latLng.lng > 0 ? 180 - latLng.lng : 180 + latLng.lng;
  }

  attachIntersection(current: LatLng, next: LatLng, map: Map) {
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
      //   const currentDistToAnti = this.calculateAnti(current);
      //   const nextDistToAnti = this.calculateAnti(next);
      //   const latDiff = Math.abs(current.lat - next.lat);
      //   const angleAtan = Math.atan(
      //     latDiff / (currentDistToAnti + nextDistToAnti)
      //   );
      //   const angle = angleAtan * this.degree * (current.lng > 0 ? 1 : -1);
      //   const latDiffAnti = Math.tan(angle * this.radian) * currentDistToAnti;
      //   const intersection = current.lat + latDiffAnti;
      //   const a = new LatLng(intersection, current.lng > 0 ? 180 : -180);
      //   const b = new LatLng(intersection, next.lng > 0 ? 180 : -180);
      //   console.log(a, b);
      //   this.addPolyline([current, a], map);
      //   this.addPolyline([b, next], map);

      const startDistToAntimeridian =
        current.lng > 0 ? 180 - current.lng : 180 + current.lng;
      const endDistToAntimeridian =
        next.lng > 0 ? 180 - next.lng : 180 + next.lng;
      const latDifference = Math.abs(current.lat - next.lat);
      const alphaAngle =
        Math.atan(
          latDifference /
            (startDistToAntimeridian + endDistToAntimeridian)
        ) *
        (180 / Math.PI) *
        (current.lng > 0 ? 1 : -1);
      const latDiffAtAntimeridian =
        Math.tan((alphaAngle * Math.PI) / 180) * startDistToAntimeridian;
      const intersectionLat = current.lat + latDiffAtAntimeridian;
      const firstLineEnd = new LatLng(intersectionLat, current.lng > 0 ? 180 : -180);
      const secondLineStart = new LatLng(intersectionLat, next.lng > 0 ? 180 : -180);
      this.addPolyline([current, firstLineEnd], map);
      this.addPolyline([secondLineStart, next], map);
      console.log(firstLineEnd, secondLineStart);
    } else {
      this.addPolyline([current, next], map);
    }
  }
}
</script>

<style>
.map-watermark {
  font-size: 150%;
  font-weight: bolder;
  color: #2e3440;
  text-shadow: #555;
}
.marker-text {
  font-size: 100%;
  color: #2e3440;
}
</style>
