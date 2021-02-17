<template>
  <v-row>
    <v-col>
      <v-sheet rounded="lg" color="#3b4252" class="pa-5 mb-2">
        <h2>Hardware Specs</h2>
        <div v-for="item in details" :key="item.sortKey">
          <strong>{{ item.key }}</strong> → {{ item.value }}
        </div>
        <h2 class="mt-5 mb-2">Senery | Plugins</h2>
        <div v-for="item in plugins" :key="item.sortKey">
          <strong>{{ item.key }}</strong> → {{ item.value }}
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { InfoKeyValue, KV } from "@/model/vo/InfoKeyValue";

@Component({
  components: {},
  computed: {}
})
export default class Specs extends Vue {
  get details(): InfoKeyValue[] {
    return [
      KV("CPU", "AMD Ryzen 9 5900X, +100mhz OC"),
      KV("Cooling", "EVGA CLC280 Liquid"),
      KV("Mainboard", "ASRock B550 Steel Legend"),
      KV("Memory", "TeamGroup T-Force DDR4-3200 CL16 +400mhz OC"),
      KV("Graphcis", "MSI GeForce RTX 3070 Gaming X Trio D6 8GB, +100mhz OC"),
      KV("Storage", "Western Digital WD BLUE SN550 1TB"),
      KV("Power", "DEEPCOOL DQ850-M-V2L 80+ Gold"),
      KV("Joystick", "Thrustmaster TCA Sidestick Airbus Edition"),
      KV("Joystick", "Thrustmaster TCA Quadrant Airbus Edition"),
      KV("Joystick", "Thrustmaster TCA Quadrant Add-On Airbus Edition"),
      KV("Joystick", "Thrustmaster T.Flight rudder"),
      KV("Monitor", "2560x1440 QHD 144hz IPS"),
      KV("Monitor", "Dell U2719D")
    ];
  }

  get plugins(): InfoKeyValue[] {
    return [
      KV("Aircraft", "FlybyWire A32NX"),
      KV("Data", "Navigraph FMS Data"),
      KV("Liveries", "FlybyWire A32NX Default"),
      KV("Senery", "SamScene3d SightSeeing SeoulCityWow"),
      KV("Tools", "Little Navmap"),
      KV("Tools", "MSFS-Mobile-Companion-App"),
      KV("Tweak", "VFR Map mod by SimFlyingFriends"),
      KV(
        "Tweak",
        "uimod-mugz-addcontrols, hiddentooltip, hiddenui, tinyhud, tinyplates, tinypoi, worldmap"
      )
    ];
  }
}
</script>

<style></style>
