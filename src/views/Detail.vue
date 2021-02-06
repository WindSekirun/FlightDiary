<template>
  <v-row>
    <v-col>
      <v-sheet color="#3b4252" rounded="lg" class="pa-5">
        <h1>{{ title }}</h1>
        <h4>{{ subtitle }}</h4>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { LOAD_DETAIL_DATA } from "@/Constants";
import store from "@/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import { AirportDetail } from "@/model/airport/AirportDetail";
import { mapState } from "vuex";
import { Metadata } from "@/model/plan/Metadata";
import { displayNm } from "@/formatter/UnitFormatter";

@Component({
  components: {},
  computed: {
    ...mapState({
      departureData: "detailDeparture",
      destinationData: "detailDestination",
      metadata: "detailMetadata"
    })
  }
})
export default class Detail extends Vue {
  metadata!: Metadata;
  departureData!: AirportDetail;
  destinationData!: AirportDetail;
  @Prop({ required: true }) id: string | undefined;
  @Prop({ required: true }) airport: string | undefined;

  get title(): string {
    return `${this.metadata.planType} ${this.metadata.departure.icao} → ${this.metadata.destination.icao}`;
  }

  get subtitle(): string {
    return `${this.metadata.flightTime} | ${displayNm(
      this.metadata.distance
    )} | ${this.metadata.aircraft}`;
  }

  created() {
    store.dispatch(LOAD_DETAIL_DATA, { id: this.id, airport: this.airport });
  }
}
</script>
