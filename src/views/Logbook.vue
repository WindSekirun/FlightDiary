<template>
  <v-sheet rounded="lg" color="#3b4252" class="pa-5">
    <h1>Logbook</h1>
    <h2 class="mt-5">Distances</h2>
    ▪ Total: {{ logbookData.totalDistance }}
    <br />
    ▪ Max: {{ logbookData.maxDistance }}
    <br />
    ▪ Min: {{ logbookData.minDistance }}
    <br />
    ▪ Average: {{ logbookData.averageDistance }}
    <h2 class="mt-5">Usage</h2>
    <h3 class="mt-2">Aircraft</h3>
    <div v-for="(item, i) in logbookData.distinctAircraft" :key="i">
      <strong>{{ i + 1 }}.</strong>
      {{ item.name }}
    </div>
    <h3 class="mt-2">Departure</h3>
    <data-table
      class="mt-2"
      :headers="tableHeader"
      :contents="logbookData.distinctDeparture"
      :table-id="`departure usage`"
      :items-per-page="5"
      disable-hide-table
    />
    <h3 class="mt-5">Destination</h3>
    <data-table
      class="mt-2"
      :headers="tableHeader"
      :contents="logbookData.distinctDestination"
      :table-id="`destination usage`"
      :items-per-page="5"
      disable-hide-table
    />
    <h2 class="mt-5">Top 10</h2>
    <h3 class="mt-2">Airports</h3>
    <data-table
      class="mt-2"
      :headers="top10TableHeader"
      :contents="logbookData.top10Airports"
      :table-id="`top10-airport`"
      :items-per-page="10"
      hide-default-footer
      disable-hide-table
    />
    <h3 class="mt-5">Departure Airports</h3>
    <data-table
      class="mt-2"
      :headers="top10TableHeader"
      :contents="logbookData.top10Departure"
      :table-id="`top10-departure-airport`"
      :items-per-page="10"
      hide-default-footer
      disable-hide-table
    />
    <h3 class="mt-5">Destination Airports</h3>
    <data-table
      class="mt-2"
      :headers="top10TableHeader"
      :contents="logbookData.top10Destination"
      :table-id="`top10-destination-airport`"
      :items-per-page="10"
      hide-default-footer
      disable-hide-table
    />
  </v-sheet>
</template>

<script lang="ts">
import { LOAD_MAIN_DATA } from "@/Constants";
import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
import {
  LogbookData,
  HEADER_ICAO,
  HEADER_NAME,
  HEADER_VISIT
} from "@/model/vo/LogbookData";
import { mapGetters } from "vuex";
import DataTable from "@/components/common/DataTable.vue";

@Component({
  components: {
    DataTable
  },
  computed: {
    ...mapGetters({
      logbookData: "getLogbookData"
    })
  }
})
export default class Logbook extends Vue {
  logbookData!: LogbookData;

  get tableHeader() {
    return [HEADER_ICAO, HEADER_NAME];
  }

  get top10TableHeader() {
    return [HEADER_ICAO, HEADER_NAME, HEADER_VISIT];
  }

  async mounted() {
    await store.dispatch(LOAD_MAIN_DATA);
  }
}
</script>
