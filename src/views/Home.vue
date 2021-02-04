<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="3">
      <v-sheet rounded="lg" color="#3b4252" class="pa-2">
        <v-expansion-panels v-model="searchOptions" accordion flat>
          <v-expansion-panel style="background:#3b4252;color:white">
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
      <v-sheet color="#3b4252" min-height="80vh" rounded="lg" class="mt-3">
        <v-row>
          <v-col
            v-for="(item, index) in listItems"
            :key="index"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <FlightItem :item="item" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Model, Vue, Watch } from "vue-property-decorator";
import FlightItem from "@/components/FlightItem.vue";
import { ListItem } from "@/model/metadata/ListItem";
import store from "@/store";
import { LOAD_MAIN_DATA } from "@/Constants";
import { mapState } from "vuex";
import { Airport } from "@/model/metadata/Airport";
import { Aircraft } from "@/model/metadata/Aircraft";
import { SearchData } from "@/model/SearchData";

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
  @Model("input", { type: Number, default: undefined }) searchOptions: number;
  @Model("input", { type: String, default: null }) selectedDeparture!: string;
  @Model("input", { type: String, default: null }) selectedDestination!: string;
  @Model("input", { type: String, default: null }) selectedAircraft!: string;

  get listItems(): ListItem[] {
    const searchData = new SearchData(
      this.selectedDeparture,
      this.selectedDestination,
      this.selectedAircraft
    );
    return store.getters.getMainList(searchData);
  }

  @Watch("searchOptions")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSearchOptionsChanged(newVal: number, oldVal: number) {
    console.log(`newVal: ${newVal} oldVal: ${oldVal}`);
    localStorage.searchOptions = newVal;
  }

  created() {
    store.dispatch(LOAD_MAIN_DATA);
    if (localStorage.searchOptions == '0') {
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
