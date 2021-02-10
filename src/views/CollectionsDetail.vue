<template>
  <v-row>
    <v-col>
      <v-sheet min-height="80vh" rounded="lg" color="#3b4252">
        This is CollectionsDetail Page
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
  computed: {}
})
export default class CollectionsDetail extends Vue {
  @Prop({ required: true }) id: string | undefined;
}
</script>
