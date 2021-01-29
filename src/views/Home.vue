<template>
  <v-row>
    <v-col cols="12" sm="3">
      <v-sheet rounded="lg" min-height="120" color="#3b4252">
        <v-list color="transparent">
          <v-responsive class="ml-3 mr-3 mt-3">
            <v-text-field
              dense
              flat
              rounded
              solo-inverted
              label="Search"
              hint="Departure, Arrival in IATA/ICAO"
            ></v-text-field>
          </v-responsive>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="9">
      <v-sheet color="#3b4252" min-height="80vh" rounded="lg" class="mt-3">
        <v-row>
          <v-col v-for="item in listItems" :key="item" cols="6" sm="6" md="6">
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
import { ListItem } from "@/model/ListItem";
import store from "@/store";
import { LOAD_LIST } from "@/Constants";

@Component({
  components: {
    FlightItem
  }
})
export default class Home extends Vue {
  searchText = "";

  get listItems(): ListItem[] {
    return store.state.itemList;
  }

  mounted() {
    store.dispatch(LOAD_LIST);
  }
}
</script>
