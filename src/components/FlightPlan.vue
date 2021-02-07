<template>
  <div>
    <v-row class="mt-5 ms-0">
      <h2>Flight Plan</h2>
      <v-btn class="ms-5" color="#8fbcbb" @click="showTable = !showTable">
        Show on table
      </v-btn>
    </v-row>

    <div v-if="showTable" class="mt-5">
      <flight-plan-table />
    </div>

    <p class="text-center mt-5">{{ planData.planRoute }}</p>
    <v-btn
      class="mt-2 d-xs-flex d-sm-flex d-md-none"
      color="#2e3440"
      block
      @click="fitToPlan()"
    >
      Fit to Plan
    </v-btn>
    <v-card class="mt-2">
      <v-responsive :aspect-ratio="mapAspectRatio">
        <l-map ref="myMap" :bounds="planData.bounds" @ready="readyLeaflet">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-polyline :lat-lngs="planData.latLngs" color="#4c566a"></l-polyline>
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
            {{ planData.planTitle }}
          </l-control>
          <div v-for="(marker, index) in planData.markers" :key="index">
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
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FlightPlanData } from "@/model/vo/FlightPlanData";
import { Map, Point } from "leaflet";
import FlightPlanTable from "./FlightPlanTable.vue";

@Component({
  components: {
    FlightPlanTable
  },
  computed: {
    ...mapGetters({
      planData: "getFlightPlanData"
    })
  }
})
export default class FlightItem extends Vue {
  planData!: FlightPlanData;
  @Prop({ default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" })
  url!: string;
  @Model("input", { type: Boolean, default: false }) showTable!: boolean;
  @Prop({
    default:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  })
  attribution!: string;
  map!: Map;
  desireCenterZoom: number;

  get mapAspectRatio() {
    console.log(this.$vuetify.breakpoint.name);
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return 16 / 9;
      case "md":
        return 16 / 9;
      default:
        return 21 / 9;
    }
  }

  readyLeaflet(mapObject: Map) {
    // fit bounds from Metadata
    this.map = mapObject;
    this.fitToPlan();
  }

  fitToPlan() {
    this.map.fitBounds(this.planData.bounds, {
      paddingTopLeft: new Point(25, 25),
      paddingBottomRight: new Point(25, 25)
    });
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
