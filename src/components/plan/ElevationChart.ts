import { Component, Mixins, Prop } from "vue-property-decorator";
import { Line, mixins } from "vue-chartjs";
import { ChartOptions } from "chart.js";

@Component({
  extends: Line, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp]
})
export default class ElevationChart extends Mixins(mixins.reactiveProp, Line) {
  @Prop({ type: Object }) options: ChartOptions;
  @Prop({ type: Array }) chartHeader: string[];
  @Prop({ type: Array }) chartData: number[];

  lineColor = "#d8dee9";

  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: this.chartHeader,
        datasets: [
          {
            label: "Elevation",
            pointBackgroundColor: this.lineColor,
            borderColor: this.lineColor,
            fill: false,
            data: this.chartData
          }
        ]
      },
      this.options
    );
  }
}
