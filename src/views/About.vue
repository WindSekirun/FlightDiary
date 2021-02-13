<template>
  <v-row>
    <v-col>
      <v-sheet rounded="lg" color="#3b4252" class="pa-5">
        <h1>About</h1>
        <h2>Flight Diary for Microsoft Flight Simulator</h2>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { InfoKeyValue, KV } from "@/model/vo/InfoKeyValue";

@Component({
  components: {},
  computed: {}
})
export default class About extends Vue {}
</script>

<style></style>
