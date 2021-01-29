<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar app color="#3b4252" flat>
        <v-container class="py-0 fill-height">
          <v-avatar class="mr-4" size="32">
            <img src="./assets/profile_akari_circle.png" alt="Profile" />
          </v-avatar>
          <b class="mr-4"> {{ title }}</b>

          <v-btn
            v-for="link in appBarLinks"
            :key="link.name"
            text
            @click="clickAppBarLink(link)"
          >
            {{ link.name }}
          </v-btn>
        </v-container>
      </v-app-bar>
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { applicationTitle } from "./Constants";
import { pageAbout, pageHome, PageRouter, pageSpec } from "./model/PageRouter";

@Component({})
export default class Home extends Vue {
  @Prop() title: string = applicationTitle;
  appBarLinks: PageRouter[] = [pageHome, pageSpec, pageAbout];

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
  color: #d8dee9;
}

.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
