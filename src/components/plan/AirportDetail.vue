<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-for="(item, index) in details" :key="index">
      <strong>{{ item.key }}</strong> → {{ item.value }}
    </div>
  </div>
</template>

<script lang="ts">
import { AirportData } from "@/model/vo/AirportData";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

class InfoKeyValue {
  key: string;
  value: string;

  constructor(k: string, v: string) {
    this.key = k;
    this.value = v;
  }
}

@Component({
  components: {},
  computed: {
    ...mapGetters({
      airportData: "getAirportData"
    })
  }
})
export default class AirportDetail extends Vue {
  @Prop({ type: Boolean, default: false }) isDestination: boolean;
  airportData!: AirportData;

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
    return [
      new InfoKeyValue("ICAO", `${this.airport.ICAO} (${this.airport.IATA})`),
      new InfoKeyValue("Name", this.airport.name),
      new InfoKeyValue("Region", this.airport.regionName)
    ];
  }
}
</script>
