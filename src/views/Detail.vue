<template>
  <v-row>
    <v-col>
      <v-sheet color="#3b4252" rounded="lg" class="pa-5 mr-1">
        <h1>{{ detailData.fullPlanTitle }}</h1>
        <h2 class="mt-2">{{ detailData.approachTitle }}</h2>
        <h4 class="mt-2">{{ detailData.planSubtitle }}</h4>
        <h2 class="mt-5">Screenshots</h2>
        <vue-picture-swipe class="mt-2" :items="detailData.imageList" />
        <h2 class="mt-5">Flight Plan</h2>
        <display-key-value :values="flightPlanDetails" />
        <leaflet-map
          :markers="detailData.markers"
          :title="detailData.planTitle"
          class="mt-5"
        />
        <div class="mt-5 mb-2">
          <data-table
            :table-id="'planDetail'"
            :headers="detailData.headers"
            :contents="detailData.contents"
          />
        </div>
        <h2 class="mt-5">Elevation Profile</h2>
        <elevation-chart
          class="mt-5"
          :options="chartOptions"
          style="height: 30vh"
          :chart-header="detailData.elevationHeader"
          :chart-data="detailData.elevationContent"
        />
        <v-row class="mt-2">
          <v-col cols="12" sm="12" md="12" lg="6">
            <airport-detail :is-destination="false" :metadata-id="id" />
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="6">
            <airport-detail :is-destination="true" :metadata-id="id" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import DisplayKeyValue from "@/components/common/DisplayKeyValue.vue";
import AirportDetail from "@/components/plan/AirportDetail.vue";
import DataTable from "@/components/common/DataTable.vue";
import LeafletMap from "@/components/common/LeafletMap.vue";
import ElevationChart from "@/components/plan/ElevationChart";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { DetailData } from "@/model/vo/DetailData";
import { Metadata } from "@/model/plan/Metadata";
import { applicationTitle } from "@/Constants";
import { ChartOptions } from "chart.js";
import { displayFt, displayFtOnly } from "@/calculator/UnitCalculator";
import { InfoKeyValue, KV } from "@/model/vo/InfoKeyValue";

@Component({
  components: {
    AirportDetail,
    DataTable,
    LeafletMap,
    ElevationChart,
    DisplayKeyValue
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

  fontColor = "#d8dee9";

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) =>
          `${tooltipItem.xLabel} - ${displayFt(
            tooltipItem.yLabel?.toString() || ""
          )}`,
        title: () => ""
      }
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            fontColor: this.fontColor
          },
          ticks: {
            fontColor: this.fontColor,
            fontSize: 14
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            fontColor: this.fontColor
          },
          ticks: {
            fontColor: this.fontColor,
            fontSize: 14,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            callback: (label: number, index: number) =>
              displayFtOnly(label.toString())
          }
        }
      ]
    }
  };

  get flightPlanDetails(): InfoKeyValue[] {
    const details = [KV("Route", this.detailData.planRoute)];

    if (this.metadata.simData && this.metadata.navData) {
      details.splice(
        0,
        0,
        KV(
          "Senery Library",
          ` ${this.metadata.simData} / ${this.metadata.navData}`
        )
      );
    }

    return details;
  }

  mounted() {
    document.title = `${this.detailData.planTitle} - ${applicationTitle}`;
  }
}
</script>
