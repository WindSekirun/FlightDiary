<template>
  <v-card :class="mapClass">
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
        :options="{
          scrollWheelZoom: false
        }"
        @ready="readyLeaflet"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-polyline :lat-lngs="meriodianPolylines" color="#4c566a"></l-polyline>
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
        <div v-for="(marker, index) in meridianMarkers" :key="index">
          <l-marker :lat-lng="marker.latLng">
            <l-tooltip :options="{ direction: 'top' }">
              {{ marker.tooltipText }}
            </l-tooltip>
            <l-icon :icon-anchor="marker.anchor" class-name="marker-icon">
              <img :src="marker.icon" />
            </l-icon>
          </l-marker>
        </div>
      </l-map>
    </v-responsive>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { latLngBounds, LatLngExpression, Map, Point, polyline } from "leaflet";
import { ATTRIBUTION, OPENSTREETMAP } from "@/Constants";
import { MarkerData } from "@/model/vo/MarkerData";
import { calculateMeridian } from "@/calculator/LeafletCalculator";

@Component({})
export default class LeafletMap extends Vue {
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

  get mapClass() {
    switch (this.$vuetify.breakpoint.name) {
      case "lg":
        return "mt-2 ms-5 me-5";
      case "xl":
        return "mt-2 ms-8 me-8";
      default:
        return "mt-2";
    }
  }

  get meridianMarkers() {
    return this.markers.map((element) => {
      element.latLng = calculateMeridian(element.latLng);
      return element;
    });
  }

  get meriodianPolylines() {
    return this.markers.map((element) => {
      return calculateMeridian(element.latLng);
    });
  }

  readyLeaflet(mapObject: Map) {
    this.map = mapObject;
    this.fitToPlan();
  }

  fitToPlan() {
    const lastIndex = this.markers.length - 1;
    const departure = calculateMeridian(this.markers[0].latLng);
    const destination = calculateMeridian(this.markers[lastIndex].latLng);
    const bounds = latLngBounds([departure, destination]);

    this.map.fitBounds(bounds, {
      paddingTopLeft: new Point(25, 25),
      paddingBottomRight: new Point(25, 25)
    });
  }

  addPolyline(tuple: LatLngExpression[], map: Map) {
    polyline(tuple, this.polylineOptions).addTo(map);
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
