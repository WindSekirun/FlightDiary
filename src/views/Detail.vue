<template>
  <v-row>
    <v-col>
      <v-sheet color="#3b4252" rounded="lg" class="pa-5">
        <h1>{{ detailTitle }}</h1>
        <h4>{{ detailSubtitle }}</h4>
        <br />
        <flight-plan />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { LOAD_DETAIL_DATA } from "@/Constants";
import store from "@/store";
import FlightPlan from "@/components/FlightPlan.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { AirportDetail } from "@/model/airport/AirportDetail";
import { mapGetters, mapState } from "vuex";
import { Metadata } from "@/model/plan/Metadata";

@Component({
  components: {
    FlightPlan
  },
  computed: {
    ...mapState({
      departureData: "detailDeparture",
      destinationData: "detailDestination",
      metadata: "detailMetadata"
    }),
    ...mapGetters({
      detailTitle: "getDetailTitle",
      detailSubtitle: "getDetailSubtitle"
    })
  }
})
export default class Detail extends Vue {
  metadata!: Metadata;
  departureData!: AirportDetail;
  destinationData!: AirportDetail;
  detailTitle!: string;
  @Prop({ required: true }) id: string | undefined;
  @Prop({ required: true }) airport: string | undefined;

  mounted() {
    store.dispatch(LOAD_DETAIL_DATA, { id: this.id, airport: this.airport });
  }
}
</script>
