<template>
  <div>
    <v-btn block class="mt-2 mb-2" color="#2e3440" @click="clickToggleTable">
      {{ hideTableButtonText }}
    </v-btn>
    <v-data-table
      v-if="!hideTable"
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
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";

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
  @Model("input", { type: Boolean, default: false }) hideTable: boolean;

  get hideTableButtonText() {
    return this.hideTable ? "Show table" : "Hide Table";
  }

  getLocalStorageKey() {
    return `hideTable${this.tableId}`;
  }

  @Watch("hideTable")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSearchOptionsChanged(newVal: boolean, oldVal: boolean) {
    localStorage[this.getLocalStorageKey()] = newVal;
  }

  mounted() {
    if (localStorage[this.getLocalStorageKey()] == "true") {
      this.hideTable = true;
    } else {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.hideTable = true;
          break;
        case "sm":
          this.hideTable = true;
          break;
        default:
          this.hideTable = false;
          break;
      }
    }
  }

  clickRow(item: TableContents) {
    this.$emit(EVENT_ROW_CLICK, item);
  }

  clickToggleTable() {
    this.hideTable = !this.hideTable;
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
