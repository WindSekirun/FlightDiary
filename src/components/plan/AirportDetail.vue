<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { AirportData } from "@/model/vo/AirportData";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

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
}
</script>
