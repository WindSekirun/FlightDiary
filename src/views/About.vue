<template>
  <v-sheet rounded="lg" color="#3b4252" class="pa-5">
    <h1>About</h1>
    <h2>Flight Diary for Microsoft Flight Simulator</h2>
    <h2 class="mt-5">Disclamer</h2>
    <p>
      Under no circumstances should any of the plans or data listed on this site
      be used for real-world aviation or as a substitute for proper flight
      planning. Site owner have no verification of the existence of routes or
      waypoints.
    </p>
    <h2 class="mt-5">Permitted Use</h2>
    <p>
      The Flight plan, and all contained data is intended
      <strong>for simulated flight navigation only</strong> and
      <strong>must not</strong> be used in real-world flight simulations.
    </p>
    <h2 class="mt-5">Feature</h2>
    <div v-for="(item, index) in features" :key="index">
      {{ item }}
    </div>
    <h2 class="mt-5">Contribute</h2>
    <p>
      This project's code is opened on Github
      (https://github.com/WindSekirun/FlightDiary). Any bugs or suggestions is
      welcome.
    </p>
    <h2 class="mt-5">Contact Me</h2>
    <div v-for="item in contactDetails" :key="item.sortKey">
      <strong>{{ item.key }}</strong> → {{ item.value }}
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { KV } from "@/model/vo/InfoKeyValue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
  computed: {}
})
export default class About extends Vue {
  get features() {
    return [
      "Display ScreenShots, Flight Plan on Map, Elevation Profile, Departure/Destination Airport information",
      "Search records by departure / destination / aircraft",
      "Auto-optimize screenshot images to lossless webp format"
    ];
  }

  get contactDetails() {
    return [
      KV("Twitter", "@WindSekirun"),
      KV("Discord", "Pyxis@1324"),
      KV("Steam", "WindSekirun")
    ];
  }
}
</script>

<style></style>
