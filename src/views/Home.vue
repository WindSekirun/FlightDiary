<template>
  <v-row>
    <v-col cols="12" sm="3">
      <v-sheet rounded="lg" min-height="120" color="#3b4252">
        <v-list color="transparent"> </v-list>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="9">
      <v-sheet color="#3b4252" min-height="80vh" rounded="lg" class="mt-3">
        <v-row>
          <v-col
            v-for="(item, index) in listItems"
            :key="index"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <FlightItem :item="item" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FlightItem from "@/components/FlightItem.vue";
import { ListItem } from "@/model/metadata/ListItem";
import store from "@/store";
import { LOAD_MAIN_DATA } from "@/Constants";

@Component({
  components: {
    FlightItem
  }
})
export default class Home extends Vue {
  get listItems(): ListItem[] {
    return store.state.itemList;
  }

  mounted() {
    store.dispatch(LOAD_MAIN_DATA);
  }
}
</script>
