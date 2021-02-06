<template>
  <div>
    <h2>Flight Plan</h2>
    <p class="text-center">{{ detailRouteContent }}</p>
    <l-map
      ref="myMap"
      style="height: 450px; width: auto"
      :bounds="planData.bounds"
      @ready="readyLeaflet"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-polyline :lat-lngs="planData.latLngs"></l-polyline>
    </l-map>
  </div>
</template>

<script lang="ts">
import { Metadata } from "@/model/plan/Metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { MapData } from "@/model/map/MapData";

@Component({
  components: {},
  computed: {
    ...mapState({
      metadata: "detailMetadata"
    }),
    ...mapGetters({
      detailRouteContent: "getDetailRouteContent",
      planData: "getDetailPlanData"
    })
  }
})
export default class FlightItem extends Vue {
  metadata!: Metadata;
  planData!: MapData;
  @Prop({ default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" })
  url!: string;

  readyLeaflet(mapObject: any) {
    // fit bounds from Metadata
    mapObject.fitBounds(this.planData.bounds);
    mapObject.setZoom(mapObject.getZoom() - 1);
  }
}
</script>
