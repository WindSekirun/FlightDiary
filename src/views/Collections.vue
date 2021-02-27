<template>
  <v-sheet color="#3b4252" rounded="lg" class="mt-3">
    <v-row>
      <v-col
        v-for="(item, index) in collectionData.data"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <CollectionItem :item="item" />
      </v-col>
    </v-row>
    <v-container>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="collectionData.pageLength"
          circle
        />
      </div>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Model, Vue } from "vue-property-decorator";
import CollectionItem from "@/components/item/CollectionItem.vue";
import { CollectionDataItem } from "@/model/collection/CollectionDataItem";
import { LOAD_COLLECTION_DATA } from "@/Constants";
import store from "@/store";
import { PaginationData } from "@/model/vo/PaginationData";
import { SearchData } from "@/model/SearchData";

@Component({
  components: { CollectionItem },
  computed: {}
})
export default class Collections extends Vue {
  page = 1;

  get collectionData(): PaginationData<CollectionDataItem> {
    const searchData = new SearchData();
    searchData.page = this.page - 1;
    return store.getters.getCollectionList(searchData);
  }

  async mounted() {
    await store.dispatch(LOAD_COLLECTION_DATA);
  }
}
</script>
