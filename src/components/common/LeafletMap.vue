<template>
  <v-card>
    <v-btn
      class="mt-2 d-xs-flex d-sm-flex d-md-none"
      color="#2e3440"
      block
      @click="fitToPlan()"
    >
      Fit to Center
    </v-btn>
    <v-responsive :aspect-ratio="mapAspectRatio">
      <l-map
        ref="myMap"
        :options="{
          scrollWheelZoom: false,
          preferCanvas: true
        }"
        style="z-index: 0"
        @ready="readyLeaflet"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-control>
          <v-btn
            class="mt-2 mr-2 d-none d-md-flex"
            color="#2e3440"
            @click="fitToPlan()"
          >
            Fit to Center
          </v-btn>
        </l-control>
        <l-control :position="'bottomleft'" class="map-watermark">
          {{ title }}
        </l-control>
        <div v-for="(marker, index) in markers" :key="index">
          <l-marker :lat-lng="marker.latLng">
            <l-tooltip :options="{ direction: 'top' }">
              {{ marker.tooltipText }}
            </l-tooltip>
            <l-icon :icon-anchor="marker.anchor" class-name="marker-icon">
              <img :src="marker.icon" />
              <div v-if="marker.headline" class="ident">
                {{ marker.headline }}
              </div>
            </l-icon>
          </l-marker>
        </div>
      </l-map>
    </v-responsive>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LatLng, latLngBounds, Map, Point } from "leaflet";
import { ATTRIBUTION, OPENSTREETMAP } from "@/Constants";
import { MarkerData } from "@/model/vo/MarkerData";
import L from "leaflet";
import "leaflet.geodesic";
import { TrailData } from "@/model/plan/TrailData";
import "leaflet/dist/images/marker-shadow.png";

@Component({})
export default class LeafletMap extends Vue {
  @Prop({ type: Array }) markers: MarkerData[];
  @Prop({ type: String }) title: string;
  @Prop({ default: OPENSTREETMAP }) url!: string;
  @Prop({ default: ATTRIBUTION }) attribution!: string;
  @Prop({ type: Boolean, default: true }) useMeridian: boolean;
  @Prop({ type: Number, default: 12 }) defaultZoomLevel: number;
  @Prop({ type: Boolean, default: false }) useZoomInCenter: boolean;
  map!: Map;

  polylineOptions = {
    color: "#4c566a",
    weight: 4
  };

  trailOptions = {
    color: "#d08770",
    dashArray: "20,15"
  };

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
    this.map = mapObject;
    this.fitToPlan();
    this.drawPolyline();
  }

  fitToPlan() {
    const lastIndex = this.markers.length - 1;
    const departure = this.markers[0].latLng;
    const destination = this.markers[lastIndex].latLng;
    const bounds = latLngBounds([departure, destination]);

    this.map.fitBounds(bounds, {
      paddingTopLeft: new Point(25, 25),
      paddingBottomRight: new Point(25, 25)
    });
    if (this.useZoomInCenter) {
      this.map.setZoom(this.defaultZoomLevel);
    }
  }

  drawPolyline() {
    const places = this.markers.map((element) => element.latLng);
    new L.Geodesic(places, this.polylineOptions).addTo(this.map);
  }

  drawTrail(trailData: TrailData | null) {
    if (trailData == null) return;

    const places = trailData.trail.map(
      (element) => new LatLng(element.lat, element.lon)
    );
    new L.Polyline(places, this.trailOptions).addTo(this.map);
  }

  panZoom(latLng: LatLng) {
    this.map.panTo(latLng);
    this.map.setZoom(this.defaultZoomLevel);
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
.ident {
  font-size: 1em;
  white-space: nowrap;
  color: #2e3440;
  margin-top: -3px;
}
</style>
