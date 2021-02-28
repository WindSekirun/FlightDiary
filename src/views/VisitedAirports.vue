<template>
  <v-sheet rounded="lg" color="#3b4252" class="pa-5">
    <h1>Visited Airports</h1>
    <v-card class="mt-5">
      <v-responsive :aspect-ratio="18 / 9">
        <l-map
          ref="myMap"
          :options="{
            scrollWheelZoom: false,
            preferCanvas: true
          }"
          :zoom="2"
          style="z-index: 0"
          @ready="readyLeaflet"
        >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <div v-for="(marker, index) in markers" :key="index">
            <l-marker
              :lat-lng="marker.latLng"
              @click="moveToAirport(marker.headline)"
            >
              <l-tooltip :options="{ direction: 'top' }">
                {{ marker.tooltipText }}
              </l-tooltip>
              <l-icon :icon-anchor="marker.anchor" class-name="marker-icon">
                <img :src="marker.icon" />
                <div v-if="marker.headline" class="ident">
                  {{ marker.headline }}
                </div>
              </l-icon>
            </l-marker>
          </div>
        </l-map>
      </v-responsive>
    </v-card>
    <data-table
      class="mt-5"
      :headers="tableHeader"
      :contents="tableContents"
      :table-id="`visited-airport`"
      :items-per-page="10"
      disable-hide-table
      @row-click="moveToAirportOnTable"
    />
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Map } from "leaflet";
import {
  ATTRIBUTION,
  EVENT_CHANGE_MENU_SELECTION,
  LOAD_MAIN_DATA,
  OPENSTREETMAP
} from "@/Constants";
import { mapState } from "vuex";
import { Airport } from "@/model/list/Airport";
import store from "@/store";
import { MarkerData } from "@/model/vo/MarkerData";
import { NAVIGATION_LOGBOOK } from "@/model/vo/MenuNavigationItem";
import EventBus from "@/main";
import DataTable from "@/components/common/DataTable.vue";
import { pageAirportDetail } from "@/model/PageRouter";
import {
  HEADER_ICAO,
  HEADER_NAME,
  LogbookAirportContent
} from "@/model/vo/LogbookData";

@Component({
  components: {
    DataTable
  },
  computed: {
    ...mapState({
      airportList: "airportList"
    })
  }
})
export default class VisitedAirports extends Vue {
  airportList!: Airport[];
  @Prop({ default: OPENSTREETMAP }) url!: string;
  @Prop({ default: ATTRIBUTION }) attribution!: string;
  defaultZoom = 12;
  map!: Map;

  readyLeaflet(mapObject: Map) {
    this.map = mapObject;
  }

  moveToAirport(icao: string) {
    EventBus.$emit(EVENT_CHANGE_MENU_SELECTION, NAVIGATION_LOGBOOK.index);
    this.$router.push({
      name: pageAirportDetail.name,
      params: {
        airport: icao
      }
    });
  }

  moveToAirportOnTable(content: LogbookAirportContent) {
    this.moveToAirport(content.ident);
  }

  get markers() {
    return this.airportList.map((element) => MarkerData.makeByAirport(element));
  }

  get tableHeader() {
    return [HEADER_ICAO, HEADER_NAME];
  }

  get tableContents() {
    return this.airportList.map((element) =>
      LogbookAirportContent.makeByDefault(element)
    );
  }

  async mounted() {
    await store.dispatch(LOAD_MAIN_DATA);
  }
}
</script>

<style>
.ident {
  font-size: 1em;
  white-space: nowrap;
  color: #2e3440;
  margin-top: -3px;
}
</style>
