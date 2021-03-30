<template>
  <v-sheet color="#3b4252" rounded="lg" class="pa-5 mr-1">
    <h1>{{ detailData.fullPlanTitle }}</h1>
    <h2 class="mt-2">{{ detailData.approachTitle }}</h2>
    <h4 class="mt-2">{{ detailData.planSubtitle }}</h4>
    <h2 class="mt-5">Screenshots</h2>
    <vue-picture-swipe class="mt-2" :items="detailData.imageList" />
    <h2 class="mt-5">Flight Plan</h2>
    <display-key-value :values="flightPlanDetails" />
    <leaflet-map
      ref="planMap"
      :markers="detailData.markers"
      :title="detailData.planTitle"
      class="mt-5"
    />
    <data-table
      class="mt-5 mb-2"
      :table-id="`planDetail-${id}`"
      :headers="detailData.headers"
      :contents="detailData.contents"
      @row-click="clickPlanDetail"
    />
    <h2 class="mt-5">Elevation Profile</h2>
    <plan-elevation-profile
      class="mt-5"
      :chart-header="detailData.elevationHeader"
      :chart-data="detailData.elevationContent"
    />
    <v-row class="mt-2">
      <v-col cols="12" sm="12" md="12" lg="6">
        <h1>Departure {{ airportData.departure.ICAO }}</h1>
        <plan-airport-detail :data-id="id" :airport="airportData.departure" />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="6">
        <h1>Destination {{ airportData.destination.ICAO }}</h1>
        <plan-airport-detail :data-id="id" :airport="airportData.destination" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import DisplayKeyValue from "@/components/common/DisplayKeyValue.vue";
import PlanAirportDetail from "@/components/plan/PlanAirportDetail.vue";
import DataTable from "@/components/common/DataTable.vue";
import LeafletMap from "@/components/common/LeafletMap.vue";
import PlanElevationProfile from "@/components/plan/PlanElevationProfile.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { DetailData, FlightPlanTableContent } from "@/model/vo/DetailData";
import { Metadata } from "@/model/plan/Metadata";
import { applicationTitle, baseDomain } from "@/Constants";
import { InfoKeyValue, KV, KVC } from "@/model/vo/InfoKeyValue";
import { TrailData } from "@/model/plan/TrailData";
import { AirportData } from "@/model/vo/AirportData";

@Component({
  components: {
    PlanAirportDetail,
    DataTable,
    LeafletMap,
    PlanElevationProfile,
    DisplayKeyValue
  },
  computed: {
    ...mapState({
      metadata: "detailMetadata"
    }),
    ...mapGetters({
      detailData: "getDetailData",
      airportData: "getAirportData"
    })
  }
})
export default class Detail extends Vue {
  airportData!: AirportData;
  detailData!: DetailData;
  metadata!: Metadata;
  trailData: TrailData | null = null;
  @Prop({ required: true }) id: string | undefined;
  @Prop({ required: true }) airport: string | undefined;
  $refs!: {
    planMap: LeafletMap;
  };

  get flightPlanDetails(): InfoKeyValue[] {
    const details = [
      KVC(
        "Plan File",
        "Little Navmap File",
        `${baseDomain}data/${this.metadata.id}/${this.metadata.flightPlanFile}`
      ),
      KV("Route", this.detailData.planRoute),
      KVC(
        "View On",
        "SkyVector",
        `https://skyvector.com/?fpl=${this.detailData.planRoute}`
      )
    ];

    if (this.metadata.simData && this.metadata.navData) {
      details.splice(
        0,
        0,
        KV(
          "Senery Library",
          ` ${this.metadata.simData} / ${this.metadata.navData}`
        )
      );
    }

    return details;
  }

  clickPlanDetail(content: FlightPlanTableContent) {
    if (!content.isProcedure) {
      this.$refs.planMap.panZoom(content.latLng);
    }
  }

  async mounted() {
    document.title = `${this.detailData.planTitle} - ${applicationTitle}`;

    if (this.metadata.hasTrail) {
      const id = this.metadata.id;
      const response = await Vue.axios.get(`data/${id}/trail.json`);
      this.trailData = response.data;
      this.$refs.planMap.drawTrail(this.trailData);
    } else {
      this.trailData = null;
    }
  }
}
</script>
