<template>
  <div>
    <h2 class="mt-5">Flight Plan</h2>
    <p class="text-center mt-2">{{ detailRouteContent }}</p>
    <v-card>
      <v-responsive :aspect-ratio="21 / 9">
        <l-map ref="myMap" :bounds="planData.bounds" @ready="readyLeaflet">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-polyline :lat-lngs="planData.latLngs" color="#4c566a"></l-polyline>
          <l-control class="example-custom-control">
            <p @click="fitToPlan()">
              Click me
            </p>
          </l-control>
          <l-control :position="'bottomleft'" class="custom-control-watermark">
            {{ planData.planTitle }}
          </l-control>
          <div v-for="(latLng, index) in planData.markers" :key="index">
            <l-marker :lat-lng="latLng"> </l-marker>
          </div>
        </l-map>
      </v-responsive>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FlightPlanData } from "@/model/vo/FlightPlanData";
import { Map } from "leaflet";

@Component({
  components: {},
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
  @Prop({
    default:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  })
  attribution!: string;
  map!: Map;

  readyLeaflet(mapObject: Map) {
    // fit bounds from Metadata
    this.map = mapObject;
    this.fitToPlan();
  }

  fitToPlan() {
    this.map.fitBounds(this.planData.bounds);
    this.map.setZoom(this.map.getZoom() - 1);
  }
}
</script>

<style>
.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #2e3440;
  text-shadow: #555;
}
</style>
