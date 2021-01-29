<template>
  <v-row>
    <v-col cols="12" sm="3">
      <v-sheet rounded="lg" min-height="268" color="#3b4252">
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

          <v-list-item v-for="n in 5" :key="n" link>
            <v-list-item-content>
              <v-list-item-title> List Item {{ n }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="9">
      <v-sheet color="#3b4252" min-height="80vh" rounded="lg">
        This is Home Page
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {}

class Mode {}
</script>
