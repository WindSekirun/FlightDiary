<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-sheet rounded="lg" min-height="120" color="#3b4252" class="pa-3">
        <p>Departure Airport</p>
        <v-select
          v-model="selectedDeparture"
          class="style-chooser"
          placeholder="Departure Airport"
          :options="airportList"
          :reduce="(airport) => airport.icao"
          label="name"
        ></v-select>
        <p class="mt-5">Destination Airport</p>
        <p class="mt-5">Aircraft</p>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="8">
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
import { Component, Model, Vue } from "vue-property-decorator";
import FlightItem from "@/components/FlightItem.vue";
import { ListItem } from "@/model/metadata/ListItem";
import store from "@/store";
import { LOAD_MAIN_DATA } from "@/Constants";
import { mapState } from "vuex";
import { Airport } from "@/model/metadata/Airport";
import { SearchData } from "@/model/SearchData";

@Component({
  components: {
    FlightItem
  },
  computed: {
    ...mapState({
      airportList: "airportList"
    })
  }
})
export default class Home extends Vue {
  airportList!: Airport[];
  @Model("input", { type: String, default: null }) selectedDeparture!: string;

  get listItems(): ListItem[] {
    const searchData = new SearchData(this.selectedDeparture, "", "");
    return store.getters.getMainList(searchData);
  }

  created() {
    store.dispatch(LOAD_MAIN_DATA);
  }
}
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #d8dee9;
  border: none;
  color: #4c566a;
  margin-left: 0px;
}
.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #4c566a;
}
</style>
