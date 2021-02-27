<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar
        app
        color="#3b4252"
        flat
        elevate-on-scroll
        scroll-target="#scrolling-panel"
      >
        <v-icon v-if="showBackButton" large @click="clickParent">
          mdi-chevron-left
        </v-icon>
        <v-app-bar-nav-icon v-if="!showBackButton" @click="drawer = !drawer" />
        <v-avatar class="mr-4" size="32">
          <img src="./assets/launcher.png" alt="Profile" />
        </v-avatar>
        <b> {{ title }}</b>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app color="#3b4252">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Flight Diary</v-list-item-title>
            <v-list-item-subtitle>by WindSekirun</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <menu-navigation
          ref="menu"
          :navigation-menus="navigationPrimary"
          @menu-click="clickMenu"
        />
        <v-divider />
        <link-menu-navigation
          :navigation-menus="navigationSecondary"
          @menu-click="clickMenu"
        />
      </v-navigation-drawer>

      <v-main id="scrolling-panel">
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { applicationTitle } from "./Constants";
import MenuNavigation from "@/components/common/MenuNavigation.vue";
import LinkMenuNavigation from "@/components/common/LinkMenuNavigation.vue";
import {
  MenuNavigationItem,
  NAVIGATION_PRIMARY,
  NAVIGATION_SECONDARY
} from "@/model/vo/MenuNavigationItem.ts";
import { Route } from "vue-router";

@Component({
  components: {
    MenuNavigation,
    LinkMenuNavigation
  }
})
export default class Home extends Vue {
  @Prop({ default: applicationTitle }) title!: string;
  navigationPrimary: MenuNavigationItem[] = NAVIGATION_PRIMARY;
  navigationSecondary: MenuNavigationItem[] = NAVIGATION_SECONDARY;
  $refs!: {
    menu: MenuNavigation;
  };
  drawer = null;
  showBackButton = false;
  parentTo: MenuNavigationItem;

  async mounted() {
    this.title = applicationTitle;
  }

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(to: Route) {
    this.showBackButton = to.meta?.parent != null;
    this.parentTo = to.meta?.parent;
  }

  clickParent() {
    if (this.parentTo != null) {
      this.clickMenu(this.parentTo);
    }
  }

  clickMenu(navigation: MenuNavigationItem) {
    if (navigation.routeTo != undefined) {
      this.$router.push(navigation.routeTo.path);
    } else if (navigation.link != undefined) {
      window.location.href = navigation.link;
    }
    this.$refs.menu.changeSelection(navigation.index);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #d8dee9;
}

.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
