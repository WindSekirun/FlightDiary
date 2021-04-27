<template>
  <elevation-chart
    :options="chartOptions"
    style="height: 30vh"
    :chart-header="chartHeader"
    :chart-data="chartData"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ElevationChart from "@/components/plan/ElevationChart";
import { displayFt, displayFtOnly } from "@/calculator/UnitCalculator";
import { ChartOptions, ChartTooltipItem } from "chart.js";

@Component({
  components: {
    ElevationChart
  },
  computed: {}
})
export default class PlanElevationProfile extends Vue {
  @Prop({ type: Array }) chartHeader: string[];
  @Prop({ type: Array }) chartData: number[];

  fontColor = "#d8dee9";

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem: ChartTooltipItem) =>
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
}
</script>
