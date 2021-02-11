<template>
  <div>
    <v-data-table
      dense
      :headers="flightPlanRouteData.headers"
      :items="flightPlanRouteData.contents"
      item-key="key"
      class="elevation-1 mytable"
    >
      <template v-slot:[`item.icon`]="{ item }">
        <img :src="item.icon" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { FlightPlanRouteData } from "@/model/vo/FlightPlanRoute";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters({
      flightPlanRouteData: "getFlightPlanRouteData"
    })
  }
})
export default class DataTable extends Vue {
  flightPlanRouteData!: FlightPlanRouteData;
}
</script>

<style>
.mytable table tr {
  background-color: #2e3440;
  color: #d8dee9;
  border-bottom: none !important;
}
</style>
