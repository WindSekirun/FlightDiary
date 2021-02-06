<template>
  <v-card class="mx-auto mb-2 ml-5 mr-5" elevation="2" outlined shaped>
    <v-img
      max-height="250"
      :src="thumbnail"
      :lazy-src="thumbnail"
      :eager="16 / 9"
      class="white--text align-end"
    >
      <v-card-title class="text-stroke">{{ title }}</v-card-title>
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-subtitle>
      {{ item.flightTime }}
      <br />
      {{ item.aircraft }}
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { baseDomain } from "@/Constants";
import { ListItem } from "@/model/list/ListItem";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FlightItem extends Vue {
  @Prop({ required: true }) item!: ListItem;

  get title(): string {
    return `${this.item.departure.icao} → ${this.item.destination.icao}`;
  }

  get information(): string {
    return `${this.item.flightTime} | ${this.item.aircraft}`;
  }

  get thumbnail(): string {
    return `${baseDomain}/data/${this.item.id}/${this.item.mainThumbnail}`;
  }
}
</script>

<style>
.text-stroke {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
