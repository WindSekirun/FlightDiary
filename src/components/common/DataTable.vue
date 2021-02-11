<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="contents"
      :items-per-page="itemPerPage"
      item-key="key"
      class="elevation-1 mytable"
      :hide-default-footer="hideDefaultFooter"
    >
      <template v-slot:[`item.icon`]="{ item }">
        <img :src="item.icon" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { TableContents, DataTableHeader } from "@/model/DataTableHeader";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
  computed: {}
})
export default class DataTable extends Vue {
  @Prop({ type: Array }) headers: DataTableHeader[];
  @Prop({ type: Array }) contents: TableContents[];
  @Prop({ type: Number, default: 10 }) itemPerPage: number;
  @Prop({ type: Boolean, default: false }) hideDefaultFooter: boolean;
}
</script>

<style>
.mytable table tr {
  background-color: #2e3440;
  color: #d8dee9;
  border-bottom: none !important;
}
</style>
