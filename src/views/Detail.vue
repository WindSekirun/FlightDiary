<template>
  <v-row>
    <v-col>
      <v-sheet color="#3b4252" rounded="lg" class="pa-5">
        <h1>{{ detailData.planTitle }}</h1>
        <h4>{{ detailData.planSubtitle }}</h4>
        <flight-plan />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { LOAD_DETAIL_DATA } from "@/Constants";
import store from "@/store";
import FlightPlan from "@/components/FlightPlan.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { DetailData } from "@/model/vo/DetailData";
import { Metadata } from "@/model/plan/Metadata";

@Component({
  components: {
    FlightPlan
  },
  computed: {
    ...mapState({
      metadata: "detailMetadata"
    }),
    ...mapGetters({
      detailData: "getDetailData"
    })
  }
})
export default class Detail extends Vue {
  detailData!: DetailData;
  metadata!: Metadata;
  @Prop({ required: true }) id: string | undefined;
  @Prop({ required: true }) airport: string | undefined;

  mounted() {
    store.dispatch(LOAD_DETAIL_DATA, { id: this.id, airport: this.airport });
  }
}
</script>
