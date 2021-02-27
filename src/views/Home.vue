<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="3">
      <v-sheet rounded="lg" color="#3b4252" class="pa-2">
        <v-expansion-panels v-model="searchOptions" accordion flat>
          <v-expansion-panel style="background: #3b4252; color: white">
            <v-expansion-panel-header>
              <h3>Search Options</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <h4>Departure Airport</h4>
              <v-select
                v-model="selectedDeparture"
                class="style-chooser"
                placeholder="Departure Airport"
                :options="airportList"
                :reduce="(airport) => airport.icao"
                label="label"
                dark
              />
              <h4 class="mt-5">Destination Airport</h4>
              <v-select
                v-model="selectedDestination"
                class="style-chooser"
                placeholder="Destination Airport"
                :options="airportList"
                :reduce="(airport) => airport.icao"
                label="label"
                dark
              />
              <h4 class="mt-5">Aircraft</h4>
              <v-select
                v-model="selectedAircraft"
                class="style-chooser"
                placeholder="Used Aircraft"
                :options="aircraftList"
                :reduce="(aircraft) => aircraft.name"
                label="name"
                dark
              />
              <v-btn class="mt-5" block depressed @click="clearOptions"
                >Clear Options</v-btn
              >
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="12" md="12" lg="9">
      <v-sheet color="#3b4252" rounded="lg" class="mt-3 mb-3">
        <v-row>
          <v-col
            v-for="(item, index) in mainData.data"
            :key="index"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <FlightItem :item="item" />
          </v-col>
        </v-row>
        <v-container>
          <div class="text-center">
            <v-pagination v-model="page" :length="mainData.pageLength" circle />
          </div>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import FlightItem from "@/components/item/FlightItem.vue";
import store from "@/store";
import { LOAD_MAIN_DATA } from "@/Constants";
import { mapState } from "vuex";
import { SearchData } from "@/model/SearchData";
import { Airport } from "@/model/list/Airport";
import { ListItem } from "@/model/list/ListItem";
import { Aircraft } from "@/model/list/Aircraft";
import { PaginationData } from "@/model/vo/PaginationData";

@Component({
  components: {
    FlightItem
  },
  computed: {
    ...mapState({
      airportList: "airportList",
      aircraftList: "aircraftList"
    })
  }
})
export default class Home extends Vue {
  airportList!: Airport[];
  aircraftList!: Aircraft[];
  searchOptions: number | null = null;
  selectedDeparture: string | null = null;
  selectedDestination: string | null = null;
  selectedAircraft: string | null = null;
  page = 1;

  get mainData(): PaginationData<ListItem> {
    const searchData = new SearchData();
    searchData.departure = this.selectedDeparture;
    searchData.destination = this.selectedDestination;
    searchData.aircraft = this.selectedAircraft;
    searchData.page = this.page - 1;
    return store.getters.getMainList(searchData);
  }

  @Watch("searchOptions")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSearchOptionsChanged(newVal: number, oldVal: number) {
    localStorage.searchOptions = newVal;
  }

  async mounted() {
    await store.dispatch(LOAD_MAIN_DATA);
    if (localStorage.searchOptions == "0") {
      this.searchOptions = 0;
    }
  }

  clearOptions() {
    this.selectedDeparture = "";
    this.selectedDestination = "";
    this.selectedAircraft = "";
  }
}
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #d8dee9;
  color: #2e3440;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #2e3440;
}
</style>
