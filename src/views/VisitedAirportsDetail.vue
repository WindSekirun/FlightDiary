<template>
  <v-sheet rounded="lg" color="#3b4252" class="pa-5">
    <h1>{{ airportDetailItem.ICAO }}</h1>
    <plan-airport-detail :airport="airportDetailItem" />
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import PlanAirportDetail from "@/components/plan/PlanAirportDetail.vue";
import { AirportDetailItem } from "@/model/airport/AirportDetailItem";
import { applicationTitle } from "@/Constants";

@Component({
  components: {
    PlanAirportDetail
  },
  computed: {
    ...mapState({
      airportDetailItem: "airportDetailItem"
    })
  }
})
export default class VisitedAirportsDetail extends Vue {
  airportDetailItem!: AirportDetailItem;
  @Prop({ required: true }) airport: string | undefined;

  mounted() {
    document.title = `${this.airportDetailItem.ICAO} - ${applicationTitle}`;
  }
}
</script>
