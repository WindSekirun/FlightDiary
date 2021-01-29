<template>
  <v-row>
    <!-- <v-col cols="2">
        <v-sheet rounded="lg">
          <v-list color="transparent">
            <v-list-item v-for="n in 5" :key="n" link>
              <v-list-item-content>
                <v-list-item-title> List Item {{ n }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col> -->

    <v-col>
      <v-sheet min-height="80vh" rounded="lg">
        This is Detail Page -> page; {{ id }}
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Detail extends Vue {
  @Prop({ required: true }) id: string | undefined;
}
</script>
