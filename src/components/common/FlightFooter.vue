<template>
  <v-card class="flex" flat tile color="#3b4252">
    <v-card-title>
      <strong class="subheading"> Flight Diary by WindSekirun </strong>

      <v-spacer></v-spacer>

      <v-btn v-for="(icon, index) in icons" :key="index" class="mx-2" dark icon>
        <v-icon size="24px" @click="clickIconLink(index)">
          {{ icon }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="py-2 white--text text-center">
      Under no circumstances should any of the plans or data listed on this site
      be used for real-world aviation or as a substitute for proper flight
      planning.
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class FlightFooter extends Vue {
  icons = ["mdi-account-box", "mdi-github"];
  iconLinks = [
    "https://uzuki.live",
    "https://github.com/WindSekirun/FlightDiary"
  ];

  clickIconLink(index: number) {
    window.location.href = this.iconLinks[index];
  }
}
</script>
