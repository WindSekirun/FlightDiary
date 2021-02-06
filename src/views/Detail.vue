<template>
  <v-row>
    <v-col>
      <v-sheet min-height="80vh" color="#3b4252" rounded="lg">
        This is Detail Page -> page; {{ id }}
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { LOAD_DETAIL_DATA } from "@/Constants";
import store from "@/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import { AirportDetail } from "@/model/airport/AirportDetail";
import { mapState } from "vuex";
import { Metadata } from "@/model/plan/Metadata";

@Component({
  components: {},
  computed: {
    ...mapState({
      departureData: "detailDeparture",
      destinationData: "detailDestination",
      metadata: "detailMetadata"
    })
  }
})
export default class Detail extends Vue {
  metadata!: Metadata;
  departureData!: AirportDetail;
  destinationData!: AirportDetail;
  @Prop({ required: true }) id: string | undefined;
  @Prop({ required: true }) airport: string | undefined;

  created() {
    store.dispatch(LOAD_DETAIL_DATA, { id: this.id, airport: this.airport });
  }
}
</script>
