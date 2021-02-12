<template>
  <v-sheet color="#3b4252" rounded="lg" class="mt-3">
    <v-row>
      <v-col
        v-for="(item, index) in listItems"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <CollectionItem :item="item" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CollectionItem from "@/components/item/CollectionItem.vue";
import { CollectionDataItem } from "@/model/collection/CollectionDataItem";
import { LOAD_COLLECTION_DATA } from "@/Constants";
import store from "@/store";
import { mapGetters } from "vuex";

@Component({
  components: { CollectionItem },
  computed: {
    ...mapGetters({
      listItems: "getCollectionList"
    })
  }
})
export default class Collections extends Vue {
  listItems!: CollectionDataItem[];

  async mounted() {
    await store.dispatch(LOAD_COLLECTION_DATA);
  }
}
</script>
