<template>
  <div>
    <v-data-table
      dense
      :headers="flightPlanTable.headers"
      :items="flightPlanTable.contents"
      item-key="ident"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters({
      flightPlanTable: "getFlightPlanTable"
    })
  }
})
export default class FlightPlanTable extends Vue {
  flightPlanTable!: FlightPlanTable;
}
</script>
