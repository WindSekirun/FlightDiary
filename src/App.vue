<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar app color="white" flat>
        <v-container class="py-0 fill-height">
          <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

          <v-btn
            v-for="link in appBarLinks"
            :key="link.name"
            text
            @click="clickAppBarLink(link)"
          >
            {{ link.name }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-responsive max-width="260">
            <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
            ></v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>
      <v-main class="grey lighten-3">
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  pageAbout,
  pageHome,
  PageRouter,
  pageSpecification
} from "./model/PageRouter";

@Component({})
export default class Home extends Vue {
  appBarLinks: PageRouter[] = [pageHome, pageSpecification, pageAbout];

  clickAppBarLink(pageRouter: PageRouter) {
    this.$router.push(`${pageRouter.path}`);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
