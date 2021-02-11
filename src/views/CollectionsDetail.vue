<template>
  <v-row>
    <v-col>
      <v-sheet rounded="lg" color="#3b4252" class="pa-5">
        <h1>{{ collectionDetail.item.title }}</h1>
        <h4 class="mt-2">
          {{ totalDistance }} | {{ collectionDetail.item.aircraft }}
        </h4>
        <h2 class="mt-5">Flight Plan</h2>
        <leaflet-map
          :markers="collectionDetail.markers"
          :title="collectionDetail.item.title"
        />
        <v-data-table
          dense
          :headers="collectionDetail.tableHeaders"
          :items="collectionDetail.tableContents"
          item-key="key"
          class="mt-5 elevation-1 mytable"
          @click:row="clickDetail"
        >
        </v-data-table>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { calculateTotalDistance } from "@/calculator/UnitCalculator";
import {
  CollectionDetailData,
  CollectionDetailTableContent
} from "@/model/vo/CollectionDetailData";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { applicationTitle } from "@/Constants";
import LeafletMap from "@/components/common/LeafletMap.vue";
import { pageDetail } from "@/model/PageRouter";

@Component({
  components: {
    LeafletMap
  },
  computed: {
    ...mapState({
      collectionDetail: "collectionDetail"
    })
  }
})
export default class CollectionsDetail extends Vue {
  collectionDetail!: CollectionDetailData;
  @Prop({ required: true }) id: string | undefined;

  get totalDistance() {
    return calculateTotalDistance(this.collectionDetail.item.distances);
  }

  mounted() {
    document.title = `${this.collectionDetail.item.title} - ${applicationTitle}`;
  }

  clickDetail(item: CollectionDetailTableContent) {
    this.$router.push({
      name: pageDetail.name,
      params: {
        id: item.id,
        airport: item.detailKey
      }
    });
  }
}
</script>

<style>
.mytable table tr {
  background-color: #2e3440;
  color: #d8dee9;
  border-bottom: none !important;
}
</style>
