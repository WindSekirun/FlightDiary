<template>
  <v-card
    class="mx-auto mb-2 ml-5 mr-5"
    elevation="2"
    outlined
    shaped
    @click="moveToDetail()"
  >
    <v-img
      max-height="250"
      :src="thumbnail"
      :lazy-src="thumbnail"
      aspect-ratio="1.7778"
      class="white--text align-end"
    >
      <v-card-title class="text-stroke">{{ item.title }}</v-card-title>
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
      {{ item.flightStartTime }} - {{ item.flightEndTime }}
      <br />
      {{ item.aircraft }}
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { baseDomain } from "@/Constants";
import { Component, Prop, Vue } from "vue-property-decorator";
import { pageCollectionDetail } from "@/model/PageRouter";
import { CollectionDataItem } from "@/model/collection/CollectionDataItem";
import * as _ from "lodash";

@Component
export default class CollectionItem extends Vue {
  @Prop({ required: true }) item!: CollectionDataItem;

  get thumbnail(): string {
    const id = _.sample(this.item.flights);
    return `${baseDomain}/data/${id}/main.webp`;
  }

  moveToDetail() {
    this.$router.push({
      name: pageCollectionDetail.name,
      params: {
        id: this.item.id
      }
    });
  }
}
</script>

<style>
.text-stroke {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
