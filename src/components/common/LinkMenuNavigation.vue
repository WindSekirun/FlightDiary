<template>
  <v-list nav>
    <v-list-item
      v-for="item in navigationMenus"
      :key="item.title"
      link
      @click="clickMenu(item)"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { MenuNavigationItem } from "@/model/vo/MenuNavigationItem";
import { Component, Prop, Vue } from "vue-property-decorator";

export const EVENT_MENU_CLICK = "menu-click";

@Component({})
export default class LinkMenuNavigation extends Vue {
  @Prop({ type: Array }) navigationMenus: MenuNavigationItem[];

  clickMenu(navigation: MenuNavigationItem) {
    this.$emit(EVENT_MENU_CLICK, navigation);
  }
}
</script>
