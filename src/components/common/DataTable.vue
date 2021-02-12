<template>
  <div>
    <v-btn
      block
      class="mt-2 mb-2 d-xs-flex d-sm-flex d-md-none"
      color="#2e3440"
      @click="clickToggleTable"
    >
      {{ showTableButtonText }}
    </v-btn>
    <v-data-table
      v-if="showTable"
      dense
      :headers="headers"
      :items="contents"
      :items-per-page="itemPerPage"
      item-key="key"
      class="elevation-1 mytable"
      :hide-default-footer="hideDefaultFooter"
      @click:row="clickRow"
    >
      <template v-slot:[`item.icon`]="{ item }">
        <img :src="item.icon" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { TableContents, DataTableHeader } from "@/model/DataTableHeader";
import { Component, Model, Prop, Vue } from "vue-property-decorator";

export const EVENT_ROW_CLICK = "row-click";

@Component({
  components: {},
  computed: {}
})
export default class DataTable extends Vue {
  @Prop({ type: String, default: "" }) tableId: string;
  @Prop({ type: Array }) headers: DataTableHeader[];
  @Prop({ type: Array }) contents: TableContents[];
  @Prop({ type: Number, default: 10 }) itemPerPage: number;
  @Prop({ type: Boolean, default: false }) hideDefaultFooter: boolean;
  @Model("input", { type: Boolean, default: false }) showTable: boolean;

  get showTableButtonText() {
    return this.showTable ? "Hide table" : "Show Table";
  }

  mounted() {
    if (localStorage[`showTable${this.tableId}`] == true) {
      this.showTable = true;
    } else {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.showTable = false;
          break;
        case "sm":
          this.showTable = false;
          break;
        default:
          this.showTable = true;
          break;
      }
    }
  }

  clickRow(item: TableContents) {
    this.$emit(EVENT_ROW_CLICK, item);
  }

  clickToggleTable() {
    this.showTable = !this.showTable;
    localStorage[`showTable${this.tableId}`] = this.showTable;
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
