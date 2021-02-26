<template>
  <div>
    <div v-for="item in values" :key="item.sortKey">
      <div v-if="item.hasUrl">
        <strong>{{ item.key }}</strong> →
        <a
          :href="item.connectUrl"
          style="color: #ffffff; text-decoration: none"
        >
          {{ item.value }}
          <v-icon dark> mdi-file-find </v-icon>
        </a>
      </div>
      <div v-if="!item.hasUrl">
        <strong>{{ item.key }}</strong> → {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InfoKeyValue } from "@/model/vo/InfoKeyValue";

@Component({
  components: {},
  computed: {}
})
export default class DisplayKeyValue extends Vue {
  @Prop({ type: Array }) values: InfoKeyValue[];
}
</script>
