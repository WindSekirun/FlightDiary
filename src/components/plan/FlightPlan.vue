<template>
  <div>
    <v-row class="mt-5 ms-0">
      <h2>Flight Plan</h2>
      <v-btn class="ms-5" color="#8fbcbb" @click="showTable = !showTable">
        Show on table
      </v-btn>
    </v-row>
    <p class="text-center mt-5">{{ planData.planRoute }}</p>
    <v-card class="mt-2">
      <leaflet-map
        :lat-lng-bounds="planData.bounds"
        :markers="planData.markers"
        :title="planData.planTitle"
      />
    </v-card>
    <div v-if="showTable" class="mt-5 mb-2">
      <flight-plan-table />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FlightPlanData } from "@/model/vo/FlightPlanData";

import FlightPlanTable from "./FlightPlanTable.vue";
import LeafletMap from "@/components/common/LeafletMap.vue";

@Component({
  components: {
    FlightPlanTable,
    LeafletMap
  },
  computed: {
    ...mapGetters({
      planData: "getFlightPlanData"
    })
  }
})
export default class FlightItem extends Vue {
  planData!: FlightPlanData;
  @Model("input", { type: Boolean, default: false }) showTable!: boolean;
}
</script>
