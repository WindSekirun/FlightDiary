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
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn text @click="clickHome()">
          <v-avatar class="mr-4" size="32">
            <img src="./assets/profile_akari_circle.png" alt="Profile" />
          </v-avatar>
          <b> {{ title }}</b>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" fixed temporary color="#3b4252">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> Flight Diary </v-list-item-title>
            <v-list-item-subtitle> by WindSekirun </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <menu-navigation
          :navigation-menus="navigationPrimary"
          @menu-click="clickMenu"
        />
        <v-divider />
        <menu-navigation
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { applicationTitle } from "./Constants";
import MenuNavigation from "@/components/common/MenuNavigation.vue";
import {
  MenuNavigationItem,
  NAVIGATION_PRIMARY,
  NAVIGATION_SECONDARY
} from "@/model/vo/MenuNavigationItem.ts";
import { pageHome } from "./model/PageRouter";

@Component({
  components: {
    MenuNavigation
  }
})
export default class Home extends Vue {
  @Prop({ default: applicationTitle })
  title!: string;
  drawer = null;
  navigationPrimary: MenuNavigationItem[] = NAVIGATION_PRIMARY;
  navigationSecondary: MenuNavigationItem[] = NAVIGATION_SECONDARY;

  async mounted() {
    this.title = applicationTitle;
  }

  clickHome() {
    this.$router.push({
      name: pageHome.name
    });
  }

  clickMenu(navigation: MenuNavigationItem) {
    if (navigation.routeTo != undefined) {
      this.$router.push(navigation.routeTo.path);
    } else if (navigation.link != undefined) {
      window.location.href = navigation.link;
    }
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
