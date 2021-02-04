<template>
  <v-card class="mx-auto mb-2 ml-5 mr-5" elevation="2" outlined shaped>
    <v-img max-height="250" :src="thumbnail" class="white--text align-end">
      <v-card-title>{{ title }}</v-card-title>
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
import { ListItem } from "@/model/metadata/ListItem";
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
