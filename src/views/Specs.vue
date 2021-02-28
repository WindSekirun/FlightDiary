<template>
  <v-sheet rounded="lg" color="#3b4252" class="pa-5 mb-2">
    <h2>Hardware Specs</h2>
    <display-key-value :values="details" />
    <h2 class="mt-5 mb-2">Senery | Plugins</h2>
    <display-key-value :values="plugins" />
  </v-sheet>
</template>

<script lang="ts">
import DisplayKeyValue from "@/components/common/DisplayKeyValue.vue";
import { Component, Vue } from "vue-property-decorator";
import { InfoKeyValue, KV, KVC } from "@/model/vo/InfoKeyValue";

@Component({
  components: {
    DisplayKeyValue
  },
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
      KVC(
        "Aircraft",
        "FlybyWire A32NX",
        "https://github.com/flybywiresim/a32nx"
      ),
      KVC("Data", "Navigraph FMS Data", "https://navigraph.com/home"),
      KV("Liveries", "FlybyWire A32NX Default"),
      KVC(
        "Senery",
        "SamScene3d SightSeeing SeoulCityWow",
        "https://samscene.com/products/seoul-city-wow-for-msfs"
      ),
      KVC(
        "Tools",
        "Little Navmap",
        "https://albar965.github.io/littlenavmap.html"
      ),
      KVC(
        "Tools",
        "MSFS-Mobile-Companion-App",
        "https://github.com/mracko/MSFS-Mobile-Companion-App"
      ),
      KVC(
        "Tweak",
        "VFR Map mod by SimFlyingFriends",
        "https://www.msfsaddons.org/freeware/plugin-vfrmap"
      ),
      KVC(
        "Tweak",
        "msfs2020-uimod",
        "https://github.com/mixMugz/msfs2020-uimod"
      )
    ];
  }
}
</script>

<style></style>
