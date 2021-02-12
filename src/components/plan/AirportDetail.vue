<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-for="(item, index) in details" :key="index">
      <strong>{{ item.key }}</strong> → {{ item.value }}
    </div>
    <v-card class="mt-5">
      <v-responsive :aspect-ratio="mapAspectRatio">
        <l-map
          ref="myMap"
          :options="{
            scrollWheelZoom: false,
            preferCanvas: true
          }"
          :zoom="12"
          :center="mapCenter"
          style="z-index: 0;"
          @ready="readyLeaflet"
        >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-control :position="'bottomleft'" class="map-watermark">
            {{ title }}
          </l-control>
          <div v-for="(marker, index) in mapMarker" :key="index">
            <l-marker :lat-lng="marker.latLng">
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
    <h3 class="mt-8">Runways</h3>
    <data-table
      :headers="runwayHeader"
      :contents="runwayContents"
      :table-id="runwayTableId"
      :items-per-page="runwayContentsLength"
      hide-default-footer
    />
    <h3 class="mt-8">{{ navAidsTitle }}</h3>
    <data-table
      :headers="navAidsHeader"
      :contents="navAidsContents"
      :table-id="navAidsTableId"
      :items-per-page="navAidsLength"
      hide-default-footer
    />
    <h3 class="mt-8">Frequencies</h3>
    <data-table
      :headers="freqHeader"
      :table-id="freqTableId"
      :contents="freqContents"
      :items-per-page="freqLength"
      hide-default-footer
    />
  </div>
</template>

<script lang="ts">
import {
  AirportData,
  AIRPORT_HEADER_FREQ,
  AIRPORT_HEADER_NAVAIDS,
  AIRPORT_HEADER_RUNWAYS
} from "@/model/vo/AirportData";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { displayFtMFloor } from "@/calculator/UnitCalculator";
import {
  displayMagnetic,
  getAirportCenter,
  getAirportFrequency,
  getAirportMarkers,
  getRunwayNavaidsData,
  getRunwayTableData
} from "@/calculator/AirportDetailCalculator";
import { ATTRIBUTION, OPENSTREETMAP } from "@/Constants";
import { LatLng, Map } from "leaflet";
import { MarkerData } from "@/model/vo/MarkerData";
import DataTable from "@/components/common/DataTable.vue";

class InfoKeyValue {
  key: string;
  value: string;

  constructor(k: string, v: string) {
    this.key = k;
    this.value = v;
  }
}

@Component({
  components: {
    DataTable
  },
  computed: {
    ...mapGetters({
      airportData: "getAirportData"
    })
  }
})
export default class AirportDetail extends Vue {
  @Prop({ type: String }) metadataId: string;
  @Prop({ type: Boolean, default: false }) isDestination: boolean;
  @Prop({ default: OPENSTREETMAP }) url!: string;
  @Prop({ default: ATTRIBUTION }) attribution!: string;
  airportData!: AirportData;
  map!: Map;

  KV(key: string, value: string) {
    return new InfoKeyValue(key, value);
  }

  readyLeaflet(mapObject: Map) {
    this.map = mapObject;
  }

  get airport() {
    return this.isDestination
      ? this.airportData.destination
      : this.airportData.departure;
  }

  get title() {
    return this.isDestination
      ? `Destination ${this.airport.ICAO}`
      : `Departure ${this.airport.ICAO}`;
  }

  get details(): InfoKeyValue[] {
    const airport = this.airport;
    const KV = this.KV;

    return [
      KV("ICAO", `${airport.ICAO} (${airport.IATA})`),
      KV("Name", airport.name),
      KV("Region", airport.regionName),
      KV("Elevation", `${displayFtMFloor(airport.elevation)} (AMSL)`),
      KV("Location", `${airport.lat}°, ${airport.lon}°`),
      KV("Runway", airport.runwayCount.toString()),
      KV("Magnetic Variation", displayMagnetic(airport))
    ];
  }

  get mapCenter(): LatLng {
    return getAirportCenter(this.airport);
  }

  get mapMarker(): MarkerData[] {
    return getAirportMarkers(this.airport);
  }

  get runwayTableId() {
    return `runway table-${this.metadataId}`;
  }

  get runwayHeader() {
    return AIRPORT_HEADER_RUNWAYS;
  }

  get runwayContents() {
    return getRunwayTableData(this.airport);
  }

  get runwayContentsLength() {
    return getRunwayTableData(this.airport).length;
  }

  get navAidsTableId() {
    return `navaids table-${this.metadataId}`;
  }

  get navAidsTitle() {
    return this.isDestination ? `Destination Navaids` : `Departure Navaids`;
  }

  get navAidsHeader() {
    return AIRPORT_HEADER_NAVAIDS;
  }

  get navAidsContents() {
    return getRunwayNavaidsData(this.airport);
  }

  get navAidsLength() {
    return getRunwayNavaidsData(this.airport).length;
  }

  get freqTableId() {
    return `freq table-${this.metadataId}`;
  }

  get freqHeader() {
    return AIRPORT_HEADER_FREQ;
  }

  get freqContents() {
    return getAirportFrequency(this.airport);
  }

  get freqLength() {
    return getAirportFrequency(this.airport).length;
  }

  get mapAspectRatio() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return 16 / 9;
      case "md":
        return 16 / 9;
      case "lg":
        return 21 / 9;
      default:
        return 25 / 9;
    }
  }
}
</script>

<style>
.map-watermark {
  font-size: 150%;
  font-weight: bolder;
  color: #2e3440;
  text-shadow: #555;
}
.ident {
  font-size: 1em;
  white-space: nowrap;
  color: #2e3440;
  margin-top: -3px;
}
</style>
