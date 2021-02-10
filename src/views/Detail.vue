<template>
  <v-row>
    <v-col>
      <v-sheet color="#3b4252" rounded="lg" class="pa-5">
        <h1>{{ detailData.fullPlanTitle }}</h1>
        <h2 class="mt-2">{{ detailData.approachTitle }}</h2>
        <h4 class="mt-2">{{ detailData.planSubtitle }}</h4>
        <h2 class="mt-5">Screenshots</h2>
        <vue-picture-swipe class="mt-2" :items="detailData.imageList" />
        <flight-plan />
        <v-row class="mt-2">
          <v-col cols="12" sm="12" md="12" lg="6">
            <airport-detail :is-destination="false" />
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="6">
            <airport-detail :is-destination="true" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import FlightPlan from "@/components/plan/FlightPlan.vue";
import AirportDetail from "@/components/plan/AirportDetail.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { DetailData } from "@/model/vo/DetailData";
import { Metadata } from "@/model/plan/Metadata";
import { applicationTitle } from "@/Constants";

@Component({
  components: {
    FlightPlan,
    AirportDetail
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
    document.title = `${this.detailData.planTitle} - ${applicationTitle}`;
  }
}
</script>
